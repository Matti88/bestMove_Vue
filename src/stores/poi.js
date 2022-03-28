//store with logic of POI (Point of Interest)

import { defineStore } from 'pinia'; 
import { useKeyApi } from './keyApi'
import axios from "axios";

export const usePoiApi = defineStore({
  id: 'poi',
  state: () => ({
    poiArea: []
    }    
  ),
  actions: {
    addPoi(poiObject){
      const api = useKeyApi();
      //adding a given POI to the POI array
      if (api.getConfirmation()) {

            poiObject.id = this.$state.poiArea.length + 1;
  
            this.$state.solutions = [];
            //post request
            axios
            .post(`http://0.0.0.0:3001/api/isoArea?API_KEY=${api.ConfirmedAPIstring}`, poiObject)
            .then((res) => (
              this.$state.poiArea = [...this.$state.poiArea, res.data]
            ));
      } else { console.log("The KEY for the API was not inserted and confirmed") }
    },
    getPois(){
      //returning the POI array
      const POIs = this.$state.poiArea;
      return(POIs);
    },
    removePois(id_){ 
      console.log(id_);
      const poiRemoved = this.$state.poiArea.filter((l) => l.poi.id != id_);
      this.$state.poiArea = poiRemoved;
  }},    


  

})
