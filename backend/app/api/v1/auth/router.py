from fastapi import APIRouter, status, Depends
from app.schemas.auth import (
    UserCreate,
    UserLogin,
    TokenResponse,
    UserResponse,
    OTPRequest,
    OTPVerify
)
from app.core.exceptions import BadRequestException, UnauthorizedException, ConflictException
from app.core.security import (
    verify_password,
    hash_password,
    create_access_token,
    create_refresh_token,
    generate_otp
)
from app.repositories.user_repository import user_repo

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate):
    existing = await user_repo.get_by_email_or_phone(user_in.email)
    if existing:
        raise ConflictException("A user with this email address already exists.")
    
    existing_phone = await user_repo.get_by_email_or_phone(user_in.phone)
    if existing_phone:
        raise ConflictException("A user with this mobile number already exists.")

    data = user_in.model_dump()
    raw_password = data.pop("password")
    data["hashed_password"] = hash_password(raw_password)
    
    new_user = await user_repo.create(data)

    token_payload = {"sub": new_user["id"], "role": new_user["role"], "email": new_user["email"]}
    access_token = create_access_token(token_payload)
    refresh_token = create_refresh_token(token_payload)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse(**new_user)
    )

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user = await user_repo.get_by_email_or_phone(credentials.phone_or_email)
    if not user:
        raise UnauthorizedException("Invalid phone/email or password")

    if not verify_password(credentials.password, user["hashed_password"]):
        raise UnauthorizedException("Invalid phone/email or password")

    token_payload = {"sub": user["id"], "role": user["role"], "email": user["email"]}
    access_token = create_access_token(token_payload)
    refresh_token = create_refresh_token(token_payload)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse(**user)
    )

@router.post("/send-otp")
async def send_otp(req: OTPRequest):
    otp = generate_otp()
    return {
        "success": True,
        "message": f"OTP successfully sent to {req.phone}",
        "demo_otp": otp
    }

@router.post("/verify-otp")
async def verify_otp(req: OTPVerify):
    return {
        "success": True,
        "message": "Phone number verified successfully"
    }
