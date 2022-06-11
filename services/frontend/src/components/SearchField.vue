<template>
  <div class="macroForm">
    <div class="collectionButtons">
      <!-- boxes of Proices and square meters -->
      <div class="flex-container wrap">
        <div class="priceSqm">
          <b-input-group size="lg" prepend="€">
            <b-form-input
              v-model="filters.priceRent"
              id="input-default"
              placeholder="Max"
            ></b-form-input>
          </b-input-group>

          <b-input-group size="lg" prepend="&#13217;">
            <b-form-input
              v-model="filters.sqmRent"
              placeholder="Min"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>

      <div class="flex-container wrap">
        <!-- metti qui i 3 tags dei poi -->
        <div
          v-for="poiSelect in filters.selectedPoisIndexes"
          v-bind:key="poiSelect.item"
        >
          <PoiTag
            v-bind:statuses="poiSelect.selected"
            v-bind:title="poiSelect.label"
            v-bind:id="poiSelect.item"
          ></PoiTag>
        </div>
      </div>

      <div class="flex-container wrap">
        <div class="priceSqm">
          <b-button @click="clearFilters" class="buttonForm">Clear Filter</b-button>
          <b-button @click="applyFilters" class="buttonForm">Apply</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PoiTag from "./PoiTag.vue";
import { BInputGroup, BFormInput } from "bootstrap-vue-3";

import { useLocations } from "@/stores/locations";
import { storeToRefs } from "pinia";

export default {
  components: {
    PoiTag,
    BInputGroup,
    BFormInput,
  },
  setup() {
    //importing the location object
    const locations = useLocations();
    const { applyFilters, clearFilters } = locations;
    const { filters } = storeToRefs(locations);

    return {
      filters,
      applyFilters,clearFilters
    };
  },
};
</script>

<style scoped>
.searchBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96%;
}

.priceSqm {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  margin: 0px;
  gap: 12px;
  width: 100%;
}

.collectionButtons {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.macroForm {
  padding: 10px;
  gap: 12px;

  width:auto;
  height: auto;

  background: #ffffff;
  box-shadow:  0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  /* border: 1px solid black; */

  margin-bottom: 20px;
}
.buttonForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px;

  width: 50%;
  height: 42px;
  left: 27px;
  top: 381px;

  background: #597BF5;
  border-radius: 8px;

  /* Text of the button */
  font-family: "Arial";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 175%;

  display: flex;
  align-items: flex-start;

  color: #ffffff;

  background-color: #597BF5;
  border-width: 0px;
}

/* invisible */

.boxSelect {
  width: 100%;
}

.flex-container {
  padding-top: 6px;
  padding-bottom: 6px;
  margin: 0;
  list-style: none;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
}

.wrap {
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
</style>
