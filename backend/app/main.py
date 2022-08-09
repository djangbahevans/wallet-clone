from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v0.api import api_router
from app.core.config import settings

from .initial_data import main

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=['*']
)

main()


app.include_router(api_router, prefix=settings.API_V0_STRING)

@app.get("/")
def root():
    return {"message": "Hello World"}
