from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, SecretStr, EmailStr, HttpUrl


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

    class Config:
        orm_mode = True


class UserUpdate(UserBase):
    password: Optional[SecretStr]
    is_active: bool
    is_superuser: bool
    is_staff: bool
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    avatar: Optional[HttpUrl]
    birth_date: Optional[date]
    gender: Optional[str]


class UserCreate(UserBase):
    password: SecretStr


class UserInDb(UserBase):
    id: int
    last_login: datetime
    hashed_password: SecretStr
    is_active: bool
    is_superuser: bool
    is_staff: bool
    date_joined: date
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    avatar: Optional[HttpUrl]
    birth_date: Optional[date]
    gender: Optional[str]


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    is_staff: bool
    date_joined: date
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    avatar: Optional[HttpUrl]
    birth_date: Optional[date]
    gender: Optional[str]

    class Config:
        orm_mode = True
