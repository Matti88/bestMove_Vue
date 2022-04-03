// store with logics of locations

import * as XLSX from 'xlsx';
import { defineStore } from 'pinia'
import { useKeyApi } from './keyApi'
import { usePoiApi } from './poi'
import axios from "axios";


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
  else 
  { return false }
}

function checkFileFormat(fileHeader) {
  const referenceHeader = ['index', 'hlink', 'himage', 'lon', 'lat', 'address', 'price', 'sqm'];
  return arrayEquals(referenceHeader, fileHeader);
}
 
export const useLocations = defineStore({

  id: 'locations',
  state: () => ({
    locationsList: [],
    solutions: { housesAllPoi: [], poiHouses: [] },
    locationsOnDisplay: [],
    matrixRoutes: {},
    polygonsList: [],
    housesSet: "All Houses",
    filters: {
      priceRent: { item: 900, label: 900 }
      , prices: [
        { item: 100, label: 100 }
        , { item: 200, label: 200 }
        , { item: 300, label: 300 }
        , { item: 600, label: 600 }
        , { item: 700, label: 700 }
        , { item: 800, label: 800 }
        , { item: 900, label: 900 }
        , { item: 1000, label: 1000 }
        , { item: 1100, label: 1100 }
        , { item: 1200, label: 1200 }
        , { item: 1300, label: 1300 }
        , { item: 2200, label: 2200 }
        , { item: 5000, label: 5000 }
        , { item: 10000, label: 10000 }
      ]
      , sqmRent: { item: 80, label: 80 }
      , sqm: [{ item: 10, label: 10 }
        , { item: 20, label: 20 }
        , { item: 30, label: 30 }
        , { item: 60, label: 60 }
        , { item: 70, label: 70 }
        , { item: 80, label: 80 }
        , { item: 90, label: 90 }
        , { item: 100, label: 100 }
        , { item: 110, label: 110 }


      ]
      , selectedPoisIndexes: []
      , poiIndexes: []
    }
  }),
  actions: {
    onChangeF(event) {

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
            //this.$state.locationsList = objects;
            this.setListOfAllHouses(objects);
          }
          else {
            console.log("File format is not matching requirements");
          }
        }
        reader.readAsBinaryString(this.file);
      }
    },
    async searchOptimal() {

      const poiApi = usePoiApi();
      const api = useKeyApi();
      const uploadedLocations = JSON.parse(JSON.stringify(this.$state.locationsList));
      const selectedPois = JSON.parse(JSON.stringify(poiApi.getPois()));

      /*These data are essential for the calcuation: test of their existence*/
      const testDataForSubmission = [uploadedLocations.length == 0, selectedPois.length == 0].some(el => el == true);

      /** Loop on the differen POIs */
      if (api.getConfirmation()) {
        if (!testDataForSubmission) {

          const queryObject = { "pois": selectedPois, "houses": uploadedLocations };

          //post request
          await axios
            .post(`http://0.0.0.0:3001/api/filteredByIsoArea?API_KEY=${api.ConfirmedAPIstring}`, queryObject)
            .then((res) =>  this.callbackWithBunchOfStuff(res )   )
        }
      } else { console.log("The KEY for the API was not inserted and confirmed") }
    },
    callbackWithBunchOfStuff(res){
      this.$state.solutions = res.data;
      this.$state.locationsOnDisplay = res.data.housesAllPoi.map(obj => ({ ...obj, focus: false }));
      this.poisChoiceUpdate()
    },
    matrixBestRoutes() {
      //POST body initiatilisation: Removing object from Prototype 
      const poiApi = usePoiApi();
      const api = useKeyApi();
      const solutionsHouses = JSON.parse(JSON.stringify(this.getSolutions()));
      const selectedPois = JSON.parse(JSON.stringify(poiApi.getPois()));

      /*These data are essential for the calcuation: test of their existence*/
      const testDataForSubmission =
        [Object.keys(solutionsHouses).length === 0, selectedPois.length == 0].some(el => el == true);

      /*Launching the query for the distance matrix*/
      if (api.getConfirmation()) {
        if (!testDataForSubmission) {
          const sources_ = solutionsHouses.map((house) => ({ "location": [house.lon, house.lat] }));
          const targets_ = selectedPois.map((house) => ({ "location": [house.lon, house.lat] }));
          const bestMoveMatrixObj = { "matrix": { "mode": "drive", "sources": sources_, "targets": targets_ }, "houses": solutionsHouses };

          //post request
          axios
            .post(`http://0.0.0.0:3001/api/bestMove?API_KEY=${api.ConfirmedAPIstring}`, bestMoveMatrixObj)
            .then((res) => (this.$state.matrixRoutes = res.data));

        } else { console.log("The Data Structure to submit for calculations are empty!") }
      } else { console.log("The KEY for the API was not inserted and confirmed") }

    },
    getSolutions() {
      //returning the array with the subSet of houses
      const solutions = this.$state.solutions;
      return solutions;
    },
    getMatrixRoutes() {
      //returning the array with the matrix of routes distances
      const solutions = this.$state.matrixRoutes;
      return solutions;
    },
    setHousesToDisplay() {

      console.log("using this function: " + this.$state.housesSet);

      if (this.$state.housesSet === "All Houses") {
        console.log("Set to 'All Houses");
        this.$state.locationsOnDisplay = this.$state.locationsList.map(obj => ({ ...obj, focus: false }))

      } else {
        console.log("NOT Set to 'All Houses");
        this.searchOptimal();
      }
    },
    setListOfAllHouses(listOfAllHouses) {
      this.$state.housesSet == "All Houses";
      // this.$state.locationsList = listOfAllHouses;
      this.$state.locationsList = listOfAllHouses.map(obj => ({ ...obj, focus: false }))
      this.setHousesToDisplay();
    },
    setOnZoom(indexOnZoom) {
      this.$state.locationsOnDisplay = this.$state.locationsOnDisplay.map(c => (c.index == indexOnZoom) ? { ...c, zoom: true } : { ...c })
    },
    unSetOnZoom(indexOnZoom) {
      this.$state.locationsOnDisplay = this.$state.locationsOnDisplay.map(c => (c.index == indexOnZoom) ? { ...c, zoom: false } : { ...c })
    },
    poisChoiceUpdate() {

      this.$state.filters.poiIndexes
        = this.$state.solutions.poiHouses.map(
          c => ({
            poiId: c.poi.poi.id, label: c.poi.poi.geoObject.properties.name + " - " + c.poi.poi.isoParams.mode.name + " - " + c.poi.poi.isoParams.range.name
          }))

      this.$state.filters.selectedPoisIndexes = this.$state.filters.poiIndexes;
    },
    applyFilters() {

      const newReferencePrice = this.$state.filters.priceRent.item;
      const priceFiltering = (houseObj) => (houseObj.price <= newReferencePrice) ? true : false;

      const newSqm = this.$state.filters.sqmRent.item;
      const sqmFiltering = (houseObj) => (houseObj.sqm > newSqm) ? true : false;

      //conditoonally serve one or another filter for POI
      const newPoiSet = this.$state.filters.selectedPoisIndexes.map((poi) => poi.poiId);
      
      function ifPoiFiltering(arrayOfpoi){
        const poiFiltering = (houseObj) => intersect( newPoiSet, houseObj.poiId);
        const poiFiltering2 = () => true;
        if ( arrayOfpoi > 0) {
          return poiFiltering
        }
        else {
          return poiFiltering2
        }
      } 
      const finalPoiFilterig = ifPoiFiltering(this.$state.filters.poiIndexes.length);
      

      if (this.$state.housesSet === 'All Houses') {
        const filteredItems = this.$state.locationsList.map(obj => ({ ...obj, focus: false }))
          .filter(priceFiltering)
          .filter(sqmFiltering);
        this.$state.locationsOnDisplay = filteredItems;
      }
      else {
        const filteredItems = this.$state.solutions.housesAllPoi.map(obj => ({ ...obj, focus: false }))
          .filter(priceFiltering)
          .filter(sqmFiltering)
          .filter(finalPoiFilterig);
        this.$state.locationsOnDisplay = filteredItems;
      }

    }

  }
})
