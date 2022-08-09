from pydantic import BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    API_V0_STRING: str = "/api/v0"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    SECRET_KEY: str
    DATABASE_HOSTNAME: str
    DATABASE_PORT: str
    DATABASE_PASSWORD: str
    DATABASE_NAME: str
    DATABASE_USERNAME: str
    DATABASE_URI: PostgresDsn = None
    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWORD: str

    @validator("DATABASE_URI", pre=True)
    def parse_uri(cls, v, values):
        if not v:
            try:
                database_hostname = values.get("DATABASE_HOSTNAME")
                database_port = values.get("DATABASE_PORT")
                database_password = values.get("DATABASE_PASSWORD")
                database_name = values.get("DATABASE_NAME")
                database_username = values.get("DATABASE_USERNAME")
                return f"postgresql://{database_username}:{database_password}@{database_hostname}:{database_port}/{database_name}"
            except:
                return v
        return v

    class Config:
        env_file = ".env"


settings = Settings()
