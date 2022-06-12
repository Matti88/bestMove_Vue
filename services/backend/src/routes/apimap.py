from fastapi import APIRouter, Request
from src.calculations.functions import polygon_collection, stree_to_go, filter_houses_in_areas, distance_matrix
import json


router = APIRouter()


@router.post("/distance_matrix")
async def distance_matrix_api(matrixQuery, housesSourcesToPOI):
    matrixQuery_ = json.load(matrixQuery)
    housesSourcesToPOI_ = json.load(housesSourcesToPOI)
    return distance_matrix(matrixQuery_, housesSourcesToPOI_)


@router.post("/filter_houses_in_areas")
async def filter_houses_in_areas_api(pois_and_houses):
    pois_and_houses_ = json.loads(pois_and_houses)
    return filter_houses_in_areas(pois_and_houses_)


@router.post("/polygon_collection")
async def polygon_collection_api(poiObject):
    poiObject_ = json.load(poiObject)
    return polygon_collection(poiObject_)


@router.get("/street_to_go/")
async def street_to_go_api(request: Request):
    params = request.query_params
    address = params['text']
    return stree_to_go(address)
