from fastapi import APIRouter
from app.api.v1.auth.router import router as auth_router
from app.api.v1.equipment.router import router as equipment_router
from app.api.v1.bookings.router import router as bookings_router
from app.api.v1.payments.router import router as payments_router
from app.api.v1.reviews.router import router as reviews_router
from app.api.v1.recommendations.router import router as recommendations_router
from app.api.v1.users.router import router as users_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(equipment_router)
api_router.include_router(bookings_router)
api_router.include_router(payments_router)
api_router.include_router(reviews_router)
api_router.include_router(recommendations_router)
api_router.include_router(users_router)
