<template>
  <div>
    <b-button class="buttonSlider" @click="changeOverlayStatus_right"
      >Display Houses</b-button
    >
    <ActiveSideBar
      :visible="rightOverlay"
      :baseZIndex="1000"
      position="right"
      class="p-sidebar-active p-sidebar-md p-sidebar"
    >
      <!-- probably  going to be a standalone component   -->
      <SearchField></SearchField>
      <!-- probably  going to be a standalone component   -->
      <SortSelector></SortSelector>

      <!-- List of houses -->
      <div v-for="location in locationsOnDisplay" :key="location.index">
        <div :href="location.hlink">
          <HouseListed
            v-bind:imagehouse="location.himage"
            v-bind:address="location.address"
            v-bind:homepriceindex="location.houseIndex"
            v-bind:sqm="location.sqm"
            v-bind:roomscount="2"
            v-bind:price="location.price"
          >
          </HouseListed>
        </div>
      </div>
    </ActiveSideBar>
  </div>
</template>

<script>
import ActiveSideBar from "./ActiveSideBar.vue";
import SortSelector from "./SortSelector.vue";
import { useLocations } from "@/stores/locations";
import { storeToRefs } from "pinia";

// import { open } from "@tauri-apps/api/shell";
import HouseListed from "./HouseListed.vue";
import SearchField from "./SearchField.vue";

export default {
  components: {
    ActiveSideBar,
    HouseListed,
    SearchField,
    SortSelector,
  },
  setup() {
    //importing the location object

    const locations = useLocations();
    const {
      unSetOnZoom,
      setOnZoom,
      applyFilters,
      matrixPatterns,
      sortByCriteria,
      updateHousesSubsetInPOI,
      storeResearch,
      changeOverlayStatus_right,
    } = locations;

    const { locationsOnDisplay, filters, isPoisOnly, rightOverlay } =
      storeToRefs(locations);

    return {
      unSetOnZoom,
      setOnZoom,
      locationsOnDisplay,
      applyFilters,
      filters,

      matrixPatterns,
      isPoisOnly,
      sortByCriteria,
      updateHousesSubsetInPOI,

      rightOverlay,
      changeOverlayStatus_right,

      storeResearch,
    };
  },
};
</script>

<style scoped>
.p-card-content {
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}

.p-card-body {
  padding-bottom: 0rem;
  padding-top: 0rem;
  padding-left: 0rem;
  padding-right: 0rem;
}

.p-card {
  padding: 0rem;
}

.p-sidebar-left.p-sidebar-md,
.p-sidebar-right.p-sidebar-md {
  width: auto;
}

.p-divider.p-divider-horizontal {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.p-card:hover {
  background: #ecedf7;
  color: #495057;
  box-shadow: 0 10px 10px -1px rgba(0, 0, 0, 0.1),
    0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 10px 10px 0 rgba(0, 0, 0, 0.1),
    0 10px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.buttonSlider {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px;
  width: 200px;
  height: 42px;
  right: 27px;
  top: 381px;
  background: #597bf5;
  border-radius: 8px;
  font-family: "Arial";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 175%;
  display: flex;
  align-items: flex-start;
  color: #ffffff;
  background-color: #597bf5;
  border-width: 0px;
}
</style>
