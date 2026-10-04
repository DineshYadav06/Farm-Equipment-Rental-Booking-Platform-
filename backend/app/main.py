from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.core.database import connect_db, close_db
from app.core.logging import setup_logging
from app.api.v1.router import api_router
from app.middleware.error_handler import register_exception_handlers

setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 FarmRentHub API starting up...")
    await connect_db()
    yield
    logger.info("🛑 FarmRentHub API shutting down...")
    await close_db()


app = FastAPI(
    title="FarmRentHub API",
    description="Agricultural Equipment Rental & Booking Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Exception Handlers ──
register_exception_handlers(app)

# ── Routes ──
app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "FarmRentHub API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/api/docs",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy", "service": "FarmRentHub API"}
