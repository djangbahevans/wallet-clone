from fastapi import APIRouter
from app.api.v0.endpoints import users, login

api_router = APIRouter()

api_router.include_router(users.router, tags=["users"], prefix="/users")
api_router.include_router(login.router, tags=["login"], prefix="/login")
