// store with logics of locations

import * as XLSX from 'xlsx';
import { defineStore } from 'pinia'
import { useKeyApi } from './keyApi'
import { usePoiApi } from './poi'
import axios from "axios";

// function printStuffAndAdd(house, list){

//   console.log(house);
//   console.log(list);

// }


function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
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
      priceRent: 570
      , prices: [{ item: 100, label: 100 }, { item: 200, label: 300 }, { item: 300, label: 300 }, { item: 600, label: 600 }, { item: 700, label: 700 }]
      , sqmRent: 70
      , sqm: [{ item: 10, label: 10 }, { item: 20, label: 20 }, { item: 30, label: 30 }, { item: 60, label: 60 }, { item: 70, label: 70 }]
      , selectedPoisIndexes : []
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
    searchOptimal() {

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
          axios
            .post(`http://0.0.0.0:3001/api/filteredByIsoArea?API_KEY=${api.ConfirmedAPIstring}`, queryObject)
            .then((res) => (

              //composing functions: with the solution set of the indexes we should filter-in the houses of our interest
              this.$state.solutions = res.data
            ));

          if (this.$state.housesSet != "All Houses") {
            // this.$state.locationsOnDisplay = this.$state.solutions.housesAllPoi;
            this.$state.locationsOnDisplay = this.$state.solutions.housesAllPoi.map(obj => ({ ...obj, focus: false }))
          }

          //updatind the pois that can be used as filters
          this.poisChoiceUpdate();

        }


      } else { console.log("The KEY for the API was not inserted and confirmed") }

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

      if (this.$state.housesSet == "All Houses") {
        // this.$state.locationsOnDisplay = this.$state.locationsList;
        this.$state.locationsOnDisplay = this.$state.locationsList.map(obj => ({ ...obj, focus: false }))

      } else {
        this.searchOptimal();
        // this.$state.locationsOnDisplay = this.$state.solutions.housesAllPoi;
        this.$state.locationsOnDisplay = this.$state.solutions.housesAllPoi.map(obj => ({ ...obj, focus: false }))
        this.recalcPOIonDisplay()

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
          
    }

  }
})
