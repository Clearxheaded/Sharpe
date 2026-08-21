import hashlib
import secrets
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from sqlalchemy.orm import Session

from app.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    JWT_ALGORITHM,
    JWT_SECRET_KEY,
    REFRESH_TOKEN_EXPIRE_DAYS,
)
from app.models import RefreshToken, User


class EmailAlreadyRegisteredError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


class InvalidTokenError(Exception):
    pass


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode(), password_hash.encode())


def register_user(db: Session, email: str, password: str) -> User:
    if db.query(User).filter(User.email == email).first() is not None:
        raise EmailAlreadyRegisteredError(email)

    user = User(email=email, password_hash=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if user is None or not verify_password(password, user.password_hash):
        raise InvalidCredentialsError()
    return user


def create_access_token(user_id: int) -> str:
    now = datetime.now(timezone.utc)
    claims = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    return jwt.encode(claims, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> int:
    try:
        claims = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise InvalidTokenError()
    return int(claims["sub"])


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def issue_refresh_token(db: Session, user_id: int) -> str:
    token = secrets.token_urlsafe(32)
    db.add(
        RefreshToken(
            user_id=user_id,
            token_hash=_hash_token(token),
            expires_at=datetime.now(timezone.utc)
            + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        )
    )
    db.commit()
    return token


def redeem_refresh_token(db: Session, token: str) -> RefreshToken:
    record = (
        db.query(RefreshToken)
        .filter(RefreshToken.token_hash == _hash_token(token))
        .first()
    )
    if (
        record is None
        or record.revoked_at is not None
        or record.expires_at < datetime.now(timezone.utc)
    ):
        raise InvalidTokenError()

    record.revoked_at = datetime.now(timezone.utc)
    db.commit()
    return record


def revoke_refresh_token(db: Session, token: str) -> None:
    record = (
        db.query(RefreshToken)
        .filter(RefreshToken.token_hash == _hash_token(token))
        .first()
    )
    if record is not None and record.revoked_at is None:
        record.revoked_at = datetime.now(timezone.utc)
        db.commit()
