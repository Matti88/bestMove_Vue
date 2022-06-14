
//store for POI component management
import { defineStore } from 'pinia'
import { useLocations } from './locations'
import _ from 'lodash';
// import { invoke } from '@tauri-apps/api/tauri';
import axios from 'axios';

class stackObject {
    constructor() {
        this.list = ['#bb0000', '#008000', '#59ce00', '#fb69b6', '#2a82ee'];
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

const colorStack = new stackObject();


export const useSearchItems = defineStore({

    id: 'searchItem',
    state: () => (
        {
            searchString: "",
            mode: "walk",
            type: "time",
            range: "",
            results: [],
            isOpen: false,
            selected: false,
            selectedResult: {},
            color: "",
            title: ""
        }
    ),
    actions: {
        queryResults: _.debounce(
            function () {

                if (!this.$state.selected) {
                    this.$state.isOpen = true;
                    this.queryStreetPOI(this.$state.searchString);
                }

            }
            , 1000),

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
            this.$state.color = colorStack.getNewColor();


        },

        queryStreetPOI(searchString) {

            axios.get('street_to_go/', { params: { text: JSON.stringify(searchString) } })
                .then((response) => (this.results = response.data.features));

        }
        ,
        commitPOIresult() {
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

                let selectedResult = { ...this.$state.selectedResult };

                let poi_obj =
                {
                    geoObject: selectedResult,
                    title: this.$state.title,
                    isoParams: {
                        mode: this.$state.mode,
                        type: this.$state.type,
                        range: this.$state.range,
                        color: this.$state.color,
                    }

                }

                locts.addPoi(poi_obj);
                this.$reset();
            }
            else {
                console.log("POI could not be submitted because some element is missing!");

            }

        }
    }

})
