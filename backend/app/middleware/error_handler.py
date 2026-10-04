from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
import logging
from app.core.exceptions import FarmRentHubException

logger = logging.getLogger(__name__)

def register_exception_handlers(app: FastAPI):
    @app.exception_handler(FarmRentHubException)
    async def farm_renthub_exception_handler(request: Request, exc: FarmRentHubException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": exc.error_code,
                    "message": exc.detail
                }
            }
        )

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error(f"Unhandled error on {request.url.path}: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An unexpected server error occurred."
                }
            }
        )
