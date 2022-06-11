<template>
  <div class="macroForm">
    <div class="collectionButtons">
      <!-- boxes of Proices and square meters -->
      <div class="flex-container wrap">
        <div class="priceSqm">
          <div class="LabelClass">
            <label size="lg"> Sorting By </label>
          </div>
          <div class="dropDownSelect">
            <b-form-group size="lg">
              <select
                class="form-control"
                @change="sortByCriteria"
                v-model="filters.sortCriteria"
              >
                <option
                  placeholder="Travel Time"
                  v-for="option in filters.sortCriteriasSet"
                  :value="option.item"
                  :key="option.item"
                >
                  {{ option.item }}
                </option>
              </select>
            </b-form-group>
          </div>
        </div>
      </div>
      <!-- boxes of Proices and square meters -->
      <div class="flex-container wrap">
        <div class="boxRow">
          <div class="LabelClass">
            <label size="lg"> Calculating the HPI indexes </label>
          </div>
          <b-button  @click="matrixPatterns" class="buttonForm">
              Calculate HPI
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormGroup } from "bootstrap-vue-3";

import { useLocations } from "@/stores/locations";
import { storeToRefs } from "pinia";

export default {
  components: { BFormGroup },
  setup() {
    //importing the location object
    const locations = useLocations();
    const { sortByCriteria, matrixPatterns, printStatus } = locations;
    const { filters } = storeToRefs(locations);

    return {
      filters,
      sortByCriteria,
      matrixPatterns,

      printStatus,
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

  width: auto;
  height: auto;

  background: #ffffff;
  box-shadow:  0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  /* border: 1px solid black; */

  margin-bottom: 20px;
}
.buttonsHPI {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px;

  width: 50%;
  height: 42px;
  left: 27px;
  top: 381px;
  display: flex;
  align-items: flex-start;

  color: #ffffff;
}

.buttonForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px;

  

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
  padding-top: 0px;
  padding-bottom: 0px;
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

.dropDownSelect {
  width: 70%;
}
.LabelClass {
  width: 30%;
  font-size: 17px;
  letter-spacing: -0.001em;
  font-weight: 800;
}

.buttonForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px;

  height: 42px;
  width: 70%;
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

.boxRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px;
  width: 100%;
  height: 60px;
}
</style>
