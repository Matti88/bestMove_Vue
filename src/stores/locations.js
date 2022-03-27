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

function checkFileFormat(fileHeader) {
  const referenceHeader = ['index', 'hlink', 'himage', 'lon', 'lat', 'address', 'price', 'sqm'];
  return arrayEquals(referenceHeader, fileHeader);
}

export const useLocations = defineStore({

  id: 'locations',
  state: () => ({
    locationsList: [],
    solutions: {housesAllPoi: [], poiHouses: []},
    matrixRoutes: {},
    polygonsList : []
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
            this.$state.locationsList = objects;

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
      const testDataForSubmission =  [uploadedLocations.length == 0, selectedPois.length == 0].some(el => el == true);

      /** Loop on the differen POIs */
      if (api.getConfirmation()) {
        if (!testDataForSubmission) {

          const queryObject = { "pois": selectedPois , "houses": uploadedLocations };

            //post request
            axios
              .post(`http://0.0.0.0:3001/api/filteredByIsoArea?API_KEY=${api.ConfirmedAPIstring}`, queryObject)
              .then((res) => (

                //composing functions: with the solution set of the indexes we should filter-in the houses of our interest
                this.$state.solutions =  res.data
              ));
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
          const bestMoveMatrixObj = { "matrix": { "mode": "drive", "sources": sources_, "targets":  targets_ }, "houses": solutionsHouses };

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
    }
  }

})
