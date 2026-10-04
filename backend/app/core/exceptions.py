from fastapi import HTTPException, status

class FarmRentHubException(HTTPException):
    def __init__(self, status_code: int, detail: str, error_code: str = "ERROR"):
        super().__init__(status_code=status_code, detail=detail)
        self.error_code = error_code

class NotFoundException(FarmRentHubException):
    def __init__(self, resource: str, identifier: str = ""):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{resource} {identifier} not found".strip(),
            error_code="NOT_FOUND"
        )

class UnauthorizedException(FarmRentHubException):
    def __init__(self, detail: str = "Could not validate credentials"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            error_code="UNAUTHORIZED"
        )

class ForbiddenException(FarmRentHubException):
    def __init__(self, detail: str = "Not enough permissions to access this resource"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
            error_code="FORBIDDEN"
        )

class BadRequestException(FarmRentHubException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            error_code="BAD_REQUEST"
        )

class ConflictException(FarmRentHubException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
            error_code="CONFLICT"
        )
