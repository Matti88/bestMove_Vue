
<template>
  <div>
    <Button @click="visibleRight = true" class="mr-2"> Display Houses</Button>
    <ActiveSideBar
      v-model:visible="visibleRight"
      :baseZIndex="1000"
      position="right"
      class="p-sidebar-active p-sidebar-md p-sidebar"
    >
      <!-- probably  going to be a standalone component   -->
      <div class="card">
        <div class="grid">
          <div class="col-6">
            <h5>Max Price</h5>
            <Dropdown
              v-model="filters.priceRent"
              :options="filters.prices"
              optionLabel="label"
              :editable="true"
              @change ="applyFilters"
            />
          </div>
          <div class="col-6">
            <h5>Min m&#178;</h5>
            <Dropdown
              v-model="filters.sqmRent"
              :options="filters.sqm"
              optionLabel="label"
              :editable="true"
            />
          </div>
        </div>

        <h5>POI of reference</h5>
        <MultiSelect
          v-model="filters.selectedPoisIndexes"
          :options="filters.poiIndexes"
          optionLabel="label"
          placeholder="Select related POIs"
        />
      </div>
      <!-- probably  going to be a standalone component   -->

      <div v-for="location in locationsOnDisplay" :key="location.index">
        <Card
          @mouseover="setOnZoom(location.index)"
          @mouseleave="unSetOnZoom(location.index)"
          class="p-card-body p-card-content p-card p-card:hover"
        >
          <template #content>
            <div class="grid">
              <div class="col-4">
                <img
                  alt="user header"
                  v-bind:src="location.himage"
                  style="width: 150px; height: 150px"
                />
              </div>
              <div class="col-8">
                <p>RENTAL PRICE : {{ location.price }}</p>
                <p>Sqm : {{ location.sqm }}</p>
                <p>Address : {{ location.address }}</p>
              </div>
            </div>
          </template>
        </Card>
        <Divider />
      </div>
    </ActiveSideBar>
  </div>
</template>


<script>
import ActiveSideBar from "./ActiveSideBar.vue";
import { useLocations } from "@/stores/locations";
import { storeToRefs } from "pinia";
import {  ref } from "vue";

export default {
  components: {
    ActiveSideBar,
  },
  setup() {
    const locations = useLocations();
    const { unSetOnZoom, setOnZoom, applyFilters } = locations;
    const { locationsOnDisplay, filters} = storeToRefs(locations);

    //parts that are going to be solved with PINIA
    const visibleRight = ref(false);
  
    return {
      unSetOnZoom,
      setOnZoom,
      locationsOnDisplay,
      applyFilters,
      filters,
      visibleRight,

    };
  },
};
</script>


<style >
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

.p-divider.p-divider-horizontal {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.p-sidebar {
  background-color: rgb(218, 233, 234);
}

.p-card:hover {
  background: #ecedf7;
  color: #495057;
  box-shadow: 0 10px 10px -1px rgba(0, 0, 0, 0.1),
    0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 10px 10px 0 rgba(0, 0, 0, 0.1),
    0 10px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>