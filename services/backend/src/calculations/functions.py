# from flask import Flask, request, jsonify, make_response
import json
import requests
from requests.structures import CaseInsensitiveDict
import urllib.parse
import copy

API_KEY_STRING = 'insert your api key here'

# CALCULATION FUNCTIONS - These can be optimized
# Ray tracing
def ray_tracing_method(x, y, poly):

    n = len(poly)
    inside = False

    p1x, p1y = poly[0]
    for i in range(n+1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xints = (y-p1y)*(p2x-p1x)/(p2y-p1y)+p1x
                    if p1x == p2x or x <= xints:
                        inside = not inside
        p1x, p1y = p2x, p2y

    return inside


# Checking 1 house on the given polygon
def check_house_in_reachable_area(longitude, latitude, ListOfShapes):

    for basicPolygons in ListOfShapes:
        for basicPolygon_ in basicPolygons:
            if ray_tracing_method(longitude, latitude, basicPolygon_):
                return True
    return False

# checking all houses


def search_between_all_solutions(allHouses, pois):
    housesInTheArea = []
    for home_ in allHouses:

        list_of_matching_POIs = []

        for poi in pois:
            if check_house_in_reachable_area(home_["lon"], home_["lat"], poi['polygons']):
                list_of_matching_POIs.append(poi['id'])

        home_enhaced = home_.copy()
        home_enhaced['poiId'] = list_of_matching_POIs
        housesInTheArea.append(home_enhaced)

    return housesInTheArea



# PROXY FUNCTIONS
# querying polygons
def polygon_collection(poiObject, API_KEY=API_KEY_STRING):

    print(poiObject['geoObject']['properties']['lat'])
    print(poiObject['geoObject']['properties']['lon'])

    lat_ = poiObject['geoObject']['properties']['lat']
    lon_ = poiObject['geoObject']['properties']['lon']
    range_ = poiObject['isoParams']['range']
    mode_ = poiObject['isoParams']['mode']
    type_ = poiObject['isoParams']['type']

    url = """https://api.geoapify.com/v1/isoline?"""\
        """lat=""" + str(lat_)\
        + "&lon=" + str(lon_)\
        + "&type=" + type_\
        + "&mode=" + mode_\
        + "&range=" + str(range_)\
        + "&apiKey=" + API_KEY

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"

    resp = requests.get(url, headers=headers)
    JSONmapObj = json.loads(resp.content)

    # return ListOfShapes, JSONmapObj
    return {"poi": poiObject, "geoApify": JSONmapObj}


def stree_to_go(text, API_KEY=API_KEY_STRING):

    url = """https://api.geoapify.com/v1/geocode/autocomplete?"""\
        + "text=" + urllib.parse.quote(text.encode('utf8'))\
        + "&apiKey=" + API_KEY

    resp = requests.get(url)
    JSONmatrix = json.loads(resp.content)

    return JSONmatrix


def filter_houses_in_areas(pois_and_houses):
    pois = pois_and_houses['pois']
    houses = pois_and_houses['houses']
    return search_between_all_solutions(houses, pois)


def distance_matrix(matrixQuery, API_KEY=API_KEY_STRING):

    print(matrixQuery)

    url = """https://api.geoapify.com/v1/routematrix?"""\
        + "apiKey=" + API_KEY
    headers = {'content-type': 'application/json'}

    resp = requests.post(url, headers=headers, data=json.dumps(matrixQuery))
    JSONmatrix = json.loads(resp.content)

    return JSONmatrix
