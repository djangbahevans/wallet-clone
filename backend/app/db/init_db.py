from app import crud, schemas
from app.core.config import settings
from app.core.security import get_password_hash
from sqlalchemy.orm.session import Session


def init_db(db: Session):
    users = crud.user.get_multi(db, skip=0, limit=1)
    if not users:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            first_name=settings.FIRST_SUPERUSER,
            last_name=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841
        user_dict = user.__dict__
        user_dict["is_superuser"] = True
        user_dict["is_staff"] = True
        user_dict["is_active"] = True
        user_update = schemas.UserUpdate(**user_dict)
        print(user_update.dict())
        crud.user.update(db, db_obj=user, obj_in=user_update)
