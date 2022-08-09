from app.db.base_class import Base
from sqlalchemy import (TIMESTAMP, Boolean, Column, Date, Integer, String,
                        Text, text)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    is_superuser = Column(Boolean, nullable=False, default=False)
    is_staff = Column(Boolean, nullable=False, default=False)
    phone = Column(String(50), nullable=True)
    address = Column(String(50), nullable=True)
    city = Column(String(50), nullable=True)
    country = Column(String(50), nullable=True)
    avatar = Column(Text, nullable=True)
    birth_date = Column(Date, nullable=True)
    gender = Column(String(50), nullable=True)
    last_login = Column(TIMESTAMP, nullable=True)
    date_joined = Column(TIMESTAMP(timezone=True),
                         nullable=False, server_default=text("now()"))
