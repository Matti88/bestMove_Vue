
<template>
  <div>
    <Button icon="pi pi-arrow-left" @click="visibleRight = true" class="mr-2" />
    <ActiveSideBar
      v-model:visible="visibleRight"
      :baseZIndex="1000"
      position="right"
      class="p-sidebar-active p-sidebar-md"
    >
      <Card 
          v-for="location in locationsOnDisplay"
          :key="location.index"
          >
        <template #content>
          <div class="grid">
            <div class="col-4">
              <img alt="user header" v-bind:src="location.himage" style=" width: 150px; height:150px"/>
            </div>
            <div class="col-8">
                <h4>RENTAL PRICE :   {{ location.price }}</h4>
                <h4>Sqm :  {{ location.sqm }} </h4>
                <h4>Address :  {{ location.address }} </h4>
            </div>
          </div>
        </template>
      </Card>
    </ActiveSideBar>
  </div>
</template>


<script>
import ActiveSideBar from "./ActiveSideBar.vue";
import { useLocations } from "@/stores/locations";
import { storeToRefs } from "pinia";
import {  watch } from "vue";

export default {
  components: {
    ActiveSideBar,
  },

  data() {
    return {
      visibleLeft: false,
      visibleRight: false,
      visibleTop: false,
      visibleBottom: false,
      visibleFull: false,
    };
  },
  setup() {
    const locations = useLocations();
    const { locationsOnDisplay } = storeToRefs(locations);
    watch(locationsOnDisplay, () => (console.log("changes on elements")));
    return {
      locationsOnDisplay
    };
  },

};
</script>
