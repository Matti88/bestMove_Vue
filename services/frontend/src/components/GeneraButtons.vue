<template>
  <div class="poiForm">
    <label>Point of Interest</label>

    <b-form submit="onSubmit">
      <b-form-group>
        <!-- Button for confirmation -->
        <b-button class="buttonForm" @click="printStatus"
          >Print Out Status</b-button
        >
      </b-form-group>

      <b-form-group>
        <!-- Button for confirmation -->
        <b-button class="buttonForm" @click="updateHousesSubsetInPOI"
          >Refrresh Status</b-button
        >
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { useLocations } from "@/stores/locations";
export default {
  setup() {
    //importing the location object
    const locations = useLocations();
    const { printStatus, updateHousesSubsetInPOI } = locations;
    return {
      printStatus,
      updateHousesSubsetInPOI,
    };
  },
};
</script>

<style scoped>
.searchBox {
  border-radius: 12px;
  width: 307px;
  height: 42px;
}

.poiForm {
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  padding: 16px;
  gap: 16px;

  /* position: absolute; */
  width: 335px;
  height: auto;
  /* left: 11px;
  top: 77px; */

  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(17, 42, 164, 0.472);
  border-radius: 16px;
}

.buttonForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;

  width: 307px;
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
  align-items: center;

  color: #ffffff;

  background-color: #597BF5;
  border-width: 0px;
}

.inputFieldForm {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;

  width: 307px;
  height: 42px;

  border: 1px solid #eeeeee;
  border-radius: 12px;
}
.btn-check:checked + .btn-outline-primary,
.btn-check:active + .btn-outline-primary,
.btn-outline-primary:active,
.btn-outline-primary.active,
.btn-outline-primary.dropdown-toggle.show {
  color: #fff;
  background-color: #a8cafc;
}
</style>
