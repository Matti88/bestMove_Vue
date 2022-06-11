<template>
  <div>
    <div @click="changeOverlayStatus_left" class="buttonSlider">POIs</div>
    <ActiveSideBarLeft
      :visible="leftOverlay"
      :baseZIndex="1000"
      position="left"
      class="p-sidebar-active p-sidebar-md p-sidebar p-content"
    >
      <!-- printOut docs
      <GeneraButtons></GeneraButtons>
      <br /> -->
      <!-- probably  going to be a standalone component   -->
      <FieldPoi></FieldPoi>
      <br />
      <div v-for="poi_ in poiArea" :key="poi_.index">
        <PoiComponent
          v-bind:poiTitle="poi_.poi.title"
          v-bind:address="poi_.poi.geoObject.properties.formatted"
          v-bind:time="poi_.poi.isoParams.range / 60"
          v-bind:modeCode="poi_.poi.isoParams.mode"
          v-bind:id="poi_.poi.id"
        />
        <br />
      </div>
    </ActiveSideBarLeft>
  </div>
</template>

<script>
import FieldPoi from "./FieldPoi.vue";
import PoiComponent from "./PoiComponent.vue";
// import GeneraButtons from "./GeneraButtons.vue";
import { storeToRefs } from "pinia";
import { useLocations } from "@/stores/locations";
import ActiveSideBarLeft from "./ActiveSideBarLeft.vue";

export default {
  components: {
    FieldPoi,
    PoiComponent,
    ActiveSideBarLeft,
    // GeneraButtons,
  },
  setup() {
    //importing the location object
    const locations = useLocations();
    const { changeOverlayStatus_left } = locations;
    const { poiArea, leftOverlay } = storeToRefs(locations);

    return {
      poiArea,
      leftOverlay,
      changeOverlayStatus_left,
    };
  },
};
</script>

<style scoped>
.p-card-content {
  padding-bottom: 0px;
  padding-top: 0.2rem;
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

.p-sidebar-content {
  height: 90vh;
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
