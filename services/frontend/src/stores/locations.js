// store with logics of locations

import * as XLSX from 'xlsx';
import { defineStore } from 'pinia';
//import { invoke } from '@tauri-apps/api/tauri'; 
import axios from 'axios';



function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function intersect(arr1, arr2) {
  var intersections = arr1.filter(e => arr2.indexOf(e) !== -1)
  if (intersections.length > 0) {
    return true
  }
  else { return false }
}

function checkFileFormat(fileHeader) {
  const referenceHeader = ['index', 'hlink', 'himage', 'lon', 'lat', 'address', 'price', 'sqm'];
  return arrayEquals(referenceHeader, fileHeader);
}

const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

function solutionFromMatrix(solutionMatrix, sourcesHouses) {


  const arrayOfAverage = solutionMatrix.sources_to_targets.map((sourceWise) => (arrAvg(sourceWise.map((target_) => (target_.time)))))
  const housePreferenceIndex = arrayOfAverage.map((k, i) =>

    Math.round(

      (((k / 60) * (sourcesHouses[i].price / sourcesHouses[i].sqm)) / 100)

      * 1000) / 1000

  );

  const newHousesWithCalculatedPreferredIndex = sourcesHouses.map((sourceWise, i) => ({ ...sourceWise, houseIndex: housePreferenceIndex[i] }))

  return newHousesWithCalculatedPreferredIndex
}

export const useLocations = defineStore({

  id: 'locations',
  state: () => ({
    "leftOverlay": false,
    "rightOverlay": false,
    "poiArea": [],
    "locationsList": [],
    "locationsOnDisplay": [],
    "filters": {
      "sortCriteria": "No Sort",
      "sortCriteriasSet": [{ "item": "No Sort" }, { "item": "price" }, { "item": "sqm" }, { "item": "houseIndex" }],
      "priceRent": "",
      "sqmRent": "",
      "selectedPoisIndexes": []
    },
    "solutions": { "housesAllPoi": [] },
    "isPoisOnly": false,
  }),
  actions: {
    fileUpload(event) {

      //load of the Excel File of Houses available
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          const [keys, ...values] = data;

          /* Checking the file format if compatible*/
          if (checkFileFormat(keys)) {

            /* Transforming and loading into store*/
            const objects = values.map(data => data.reduce((a, v, i) => ({ ...a, [keys[i]]: v }), {}));
            this.setListOfAllHousesBegin(objects);
          }
          else {
            console.log("File format is not matching requirements");
          }
        }
        reader.readAsBinaryString(this.file);
      }
    },
    async matrixPatterns() {

      //POST body initiatilisation: Removing object from Prototype   
      const solutionsHouses = this.$state.locationsOnDisplay;
      const poiIndexes_ = this.getPois();

      /*These data are essential for the calcuation: test of their existence*/
      const testDataForSubmission =
        [Object.keys(solutionsHouses).length === 0, poiIndexes_.length == 0].some(el => el == true);

      /*Launching the query for the distance matrix*/

      if (!testDataForSubmission) {
        const sources_ = solutionsHouses.map((house) => ({ "location": [house.lon, house.lat] }));
        const targets_ = poiIndexes_.map((poi_) => ({ "location": [poi_.poi.geoObject.properties.lon, poi_.poi.geoObject.properties.lat] }));
        const bestMoveMatrixObj = { "mode": "drive", "sources": sources_, "targets": targets_ };
        const sizeMatrix = sources_.length * targets_.length


        console.log("The total size of the matrix is: ", sizeMatrix);
        if (sizeMatrix <= 20) {

          axios.post('distance_matrix', { "poisVshouses": bestMoveMatrixObj })
            .then((res) => (this.$state.locationsOnDisplay = solutionFromMatrix(res.data, solutionsHouses)))

        } else {
          alert("Combinations of POIs and Houses exceed the limit of 20");
          console.log("The total size of the matrix exceed 20 relations. We suggest to limit the research ");
        }

      } else { console.log("The Data Structure to submit for calculations are empty!") }

    },
    async updateHousesSubsetInPOI() {

      const uploadedLocations = JSON.parse(JSON.stringify(this.$state.locationsList));
      const selectedPois = JSON.parse(JSON.stringify(this.getPois()));
      uploadedLocations.forEach(function (v) { delete v.poiId });

      /*These data are essential for the calcuation: test of their existence*/
      const testDataForSubmission = [uploadedLocations.length == 0, selectedPois.length == 0].some(el => el == true);

      if (!testDataForSubmission) {

        const poisCalcObjects = selectedPois.map((el_) => (
          {
            polygons: el_.geoApify.features[0].geometry.coordinates,
            id: el_.poi.id
          }
        ))
        const queryObject = { "houses": uploadedLocations, "": poisCalcObjects };

        await axios.post('filter_houses_in_areas', { "poishouses": queryObject })
          .then((res) => (this.callbackSubsetHouses(res.data)));

      }
    },

    async updatePolygonsAndHousesSubsetInPOI(poiObject) {

      await axios.post('polygon_collection', { "poiobject": poiObject })
        .then((res) => (
          this.$state.poiArea = [...this.$state.poiArea, res.data]
        ));


      const uploadedLocations = JSON.parse(JSON.stringify(this.$state.locationsList));
      const selectedPois = JSON.parse(JSON.stringify(this.getPois()));
      uploadedLocations.forEach(function (v) { delete v.poiId });

      /*These data are essential for the calcuation: test of their existence*/
      const testDataForSubmission = [uploadedLocations.length == 0, selectedPois.length == 0].some(el => el == true);

      if (!testDataForSubmission) {

        const poisCalcObjects = selectedPois.map((el_) => (
          {
            polygons: el_.geoApify.features[0].geometry.coordinates,
            id: el_.poi.id
          }
        ))
        const queryObject = { houses: uploadedLocations, pois: poisCalcObjects };

        await axios.post('filter_houses_in_areas', { "poishouses": queryObject })
          .then((res) => (this.callbackSubsetHouses(res.data)));

      }
    },




    callbackSubsetHouses(response) {
      this.$state.locationsList = response;
      this.$state.locationsOnDisplay = response.map(obj => ({ ...obj, focus: false })); //adding the focus parameter because of the on-hover effect
    },
    setListOfAllHousesBegin(listOfAllHouses) {
      this.$state.locationsList = listOfAllHouses.map(obj => ({ ...obj, focus: false })) //adding the focus parameter because of the on-hover effect
      this.$state.locationsOnDisplay = this.$state.locationsList.map(obj => ({ ...obj, focus: false })) //adding the focus parameter because of the on-hover effect
    },
    setOnZoom(indexOnZoom) {
      this.$state.locationsOnDisplay = this.$state.locationsOnDisplay.map(c => (c.index == indexOnZoom) ? { ...c, zoom: true } : { ...c })
    },
    unSetOnZoom(indexOnZoom) {
      this.$state.locationsOnDisplay = this.$state.locationsOnDisplay.map(c => (c.index == indexOnZoom) ? { ...c, zoom: false } : { ...c })
    },
    applyFilters() {

      const newReferencePrice = this.$state.filters.priceRent;
      const priceFiltering = (this.$state.filters.priceRent === "") ? () => true : (houseObj) => (houseObj.price <= newReferencePrice) ? true : false;
      const poiSelectedFiltering = (poi) => (poi.selected) ? true : false;
      const newSqm = this.$state.filters.sqmRent;
      const sqmFiltering = (this.$state.filters.sqmRent === "") ? () => true : (houseObj) => (houseObj.sqm > newSqm) ? true : false;

      const arraySetPOIids = this.$state.filters.selectedPoisIndexes.filter(poiSelectedFiltering).map((poi) => poi.item);


      //conditionally serve one or another filter for POI
      function ifPoiFiltering(selectedPois) {
        //this is some preFiltering function that chooses between 2 situations
        const poiFiltering = (houseObj) => intersect(arraySetPOIids, houseObj.poiId);
        const poiFiltering2 = () => true;
        const filterToUse = (selectedPois.length > 0) ? poiFiltering : poiFiltering2;
        return filterToUse
      }
      const finalPoiFilterig = ifPoiFiltering(arraySetPOIids);

      const filteredItems = this.$state.locationsList.map(obj => ({ ...obj, focus: false })) //adding the focus parameter because of the on-hover effect
        .filter(priceFiltering)
        .filter(sqmFiltering)
        .filter(finalPoiFilterig);
      this.$state.locationsOnDisplay = filteredItems;

    },

    clearFilters() {

      this.$state.filters.priceRent = "";
      this.$state.filters.sqmRent = "";
      this.$state.filters.sortCriteria = "No Sort";
      this.$state.filters.selectedPoisIndexes = this.$state.filters.selectedPoisIndexes.map((poi) => ({ ...poi, selected: false }));

      this.applyFilters();

    },

    sortByCriteria() {

      const criterium = this.$state.filters.sortCriteria;

      function compareToSort(a, b) {
        return a[criterium] - b[criterium];
      }

      if (criterium !== "No Sort") {
        const HousesToSort = this.$state.locationsOnDisplay;
        this.$state.locationsOnDisplay = HousesToSort.sort(compareToSort);
      }


    },


    /*POI sections*/
    getPois() {
      //returning the POI array
      const POIs = this.$state.poiArea;
      return (POIs);
    },
    addPoi(poiObject) {

      //adding a given POI to the POI array
      poiObject.id = this.$state.poiArea.length == 0 ? 1 : Math.max(...this.$state.poiArea.map((poi) => poi.poi.id)) + 1;
      this.$state.solutions = [];
      this.updatePolygonsAndHousesSubsetInPOI(poiObject);

      //add the list of selectedPoisIndexes 
      const poiForSelection = { "item": poiObject.id, "label": poiObject.title, "selected": true }
      this.$state.filters.selectedPoisIndexes.push(poiForSelection)

    },



    removePois(id_) {

      //removing all the pois from the list
      this.$state.poiArea = this.$state.poiArea.filter((l) => l.poi.id != id_);
      this.$state.filters.selectedPoisIndexes = this.$state.filters.selectedPoisIndexes.filter((l) => l.item != id_);

      //update the list of houses that are withing POIs 
      this.updateHousesSubsetInPOI();
    },




    // selectedPoisIndexes
    updatePoiVisibility(id_) {

      const changeVisibilityPoi = this.$state.filters.selectedPoisIndexes;

      const pois = changeVisibilityPoi.map(
        (poi) => {
          if (poi.item == id_) { return { ...poi, selected: !poi.selected } }
          else return poi
        }
      );

      this.$state.filters.selectedPoisIndexes = pois;

    },
    printStatus() {

    },
    resetLocations() {
      this.$state.locationsList = [];
      this.$state.locationsOnDisplay = [];
    },
    changeOverlayStatus_left() {
      this.$state.leftOverlay = !this.$state.leftOverlay;
    },
    changeOverlayStatus_right() {
      this.$state.rightOverlay = !this.$state.rightOverlay;
    }


  }
})
