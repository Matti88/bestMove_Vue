
//store for POI component management
import { defineStore } from 'pinia'
import { useKeyApi } from './keyApi'
import { usePoiApi } from './poi'
import { useLocations} from './locations'
import axios from "axios";

class stackObject {
    constructor() {
      this.list = ['#bb0000','#008000','#59ce00','#fb69b6','#2a82ee'];
      this.counter = 0;
      this.max = this.list.length;
    }
    addtoStack(itemToStack) {
      this.list.append(itemToStack);
    }
    getNewColor() {
      var return_item;
  
      if (this.counter === this.list.length - 1) {
        return_item = this.list[this.counter];
        this.counter = 0;
        return return_item;
      } else {
        return_item = this.list[this.counter];
        this.counter = this.counter + 1;
        return return_item;
      }
    }
  
  }

const  colorStack = new stackObject();

export const useSearchItems = defineStore({

    id: 'searchItem',
    state: () => (
        {
            searchString: "",
            mode: "",
            type: "time",
            range: "",
            results: [],
            isOpen: false,
            selected: false,
            selectedResult: {},
            color : ""
        }
    ),
    actions: { 
        queryResults(eventString) {
            //query the suggested locations given a string with partial name
            const api = useKeyApi();
            
            if (api.getConfirmation()) {
                if (!this.$state.selected) {
                    this.$state.isOpen = true;

                    console.log("received even string: " + eventString);

                    axios
                        .get(`http://0.0.0.0:3001/api/streetToGeo?query=${eventString}&API_KEY=${api.ConfirmedAPIstring}`)
                        .then((response) => (this.$state.results = response.data.features));
                }
            } else { console.log("The KEY for the API was not inserted and confirmed") }
        },

        setSingleResults(result) {
            //setting up for one of the results of the suggested locations

            /* Resetting for refreshed parts */
            this.$state.isOpen = false;
            this.$state.selected = true;
            this.$state.results = [];

            /** keeping for submitting to POI store*/
            this.$state.selectedResult = result
            this.$state.searchString = result.properties.formatted;
            /* picking the color of the isoAra's border */
            console.log(colorStack.getNewColor());
            this.$state.color = colorStack.getNewColor();


        },
        commitPOIresult() {
            const poiApi = usePoiApi();
            const locts = useLocations();

            /* Check all values are non-null */
            const arrayTestSufficientValues = [
                this.$state.searchString == "",
                this.$state.mode == "",
                this.$state.type == "",
                this.$state.range == "",
                !this.$state.selected,
            ].every(element => element === false)

            if (arrayTestSufficientValues) {
                let poi_obj = 
                {
                    geoObject: this.$state.selectedResult,
                    isoParams : {
                        mode: this.$state.mode,
                        type: this.$state.type,
                        range: this.$state.range,
                        color: this.$state.color
                    }

                } 
                poiApi.addPoi(poi_obj);
                locts.searchOptimal();
                this.$reset();
            }
            else {
                console.log("POI could not be submitted because some element is missing!");

            }

        }
    }

})
