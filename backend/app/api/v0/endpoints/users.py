from typing import Any, List

from app import crud, models, schemas
from app.api import deps
from app.core.security import get_password_hash
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm.session import Session

router = APIRouter()


@router.get("/", response_model=List[schemas.UserResponse])
def read_users(
    response: Response,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_admin),
) -> Any:
    """
    Retrieve users.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    count = crud.user.get_multi_total_count(db)
    response.headers["x-total-count"] = f"{count}"
    return users


@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_active_user)
):
    """
    Get current user
    """
    return current_user


@router.get("/{id}", response_model=schemas.UserResponse)
def get_single_user(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    """
    Get single user
    """
    if current_user.is_superuser:
        return crud.user.get(db, id=id)

    if id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The user does not have enough privileges"
        )

    return current_user


@router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_req: schemas.UserCreate, db: Session = Depends(deps.get_db)) -> Any:
    """
    Create new user without the need to be logged in.
    """
    while True:
        user = crud.user.get_by_email(db, email=user_req.email)
        if not user:
            break

    user_in = schemas.UserCreate(
        **user_req.dict(), password=get_password_hash(user_req.password))
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.post("/by-admin", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_by_admin(user_req: schemas.UserCreate, db: Session = Depends(deps.get_db), current_user: schemas.UserInDb = Depends(deps.get_current_active_admin)) -> Any:
    """
    Create a user while logged in as admin
    """
    while True:
        user = crud.user.get_by_email(db, email=user_req.email)
        if not user:
            break

    password = get_password_hash(user_req.password)

    user_in = schemas.UserCreate(**user_req.dict(), password=password)
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.delete("/{id}")
def delete_user(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: schemas.UserInDb = Depends(deps.get_current_active_user)
):
    if current_user.is_superuser:
        crud.user.remove(db, id=id)
    elif id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The user does not have enough privileges"
        )
    else:
        crud.user.remove(db, id=id)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
