from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import get_current_user
from app.models import User
from app.services.auth_service import (
    EmailAlreadyRegisteredError,
    InvalidCredentialsError,
    InvalidTokenError,
    authenticate_user,
    create_access_token,
    issue_refresh_token,
    redeem_refresh_token,
    register_user,
    revoke_refresh_token,
)

router = APIRouter()


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class LogoutRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    email: str

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


@router.post("/auth/register", response_model=UserResponse, status_code=201)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    try:
        return register_user(db, request.email, request.password)
    except EmailAlreadyRegisteredError:
        raise HTTPException(status_code=409, detail="Email is already registered.")


@router.post("/auth/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    try:
        user = authenticate_user(db, request.email, request.password)
    except InvalidCredentialsError:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    return TokenResponse(
        access_token=create_access_token(user.id),
        refresh_token=issue_refresh_token(db, user.id),
    )


@router.post("/auth/refresh", response_model=TokenResponse)
def refresh(request: RefreshRequest, db: Session = Depends(get_db)):
    try:
        record = redeem_refresh_token(db, request.refresh_token)
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token.")

    return TokenResponse(
        access_token=create_access_token(record.user_id),
        refresh_token=issue_refresh_token(db, record.user_id),
    )


@router.post("/auth/logout", status_code=204)
def logout(request: LogoutRequest, db: Session = Depends(get_db)):
    revoke_refresh_token(db, request.refresh_token)


@router.get("/auth/me", response_model=UserResponse)
def read_current_user(user: User = Depends(get_current_user)):
    return user
