from fastapi import APIRouter, HTTPException, Query
from .. import crud, models

router = APIRouter(prefix="/species", tags=["species"])

@router.get("/")
async def list_species(status: str = Query(None), q: str = Query(None)):
    return await crud.get_species(status=status, q=q)