from fastapi import APIRouter, Request, Body
from src.calculations.functions import polygon_collection, stree_to_go, filter_houses_in_areas, distance_matrix
import json as json2


router = APIRouter()


@router.post("/distance_matrix")
async def distance_matrix_api(matrixObject: dict = Body(...)):
    return distance_matrix(matrixObject['poisVshouses'])


@router.post("/filter_houses_in_areas")
async def filter_houses_in_areas_api(pois_and_houses: dict = Body(...)):
    return filter_houses_in_areas(pois_and_houses['poishouses'])


@router.post("/polygon_collection")
async def polygon_collection_api(poiObject: dict = Body(...)):
    return polygon_collection(poiObject['poiobject'])


@ router.get("/street_to_go/")
async def street_to_go_api(request: Request):
    params = request.query_params
    print(params)
    address = params['text']
    print(address)
    return stree_to_go(address)
