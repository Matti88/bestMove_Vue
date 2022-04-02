
<template>
  <div >
    <Button @click="visibleRight = true" class="mr-2"> Display Houses</Button>
    <ActiveSideBar
      v-model:visible="visibleRight"
      :baseZIndex="1000"
      position="right"
      class="p-sidebar-active p-sidebar-md overlyMngmt" 
    >
      <h5>Range: {{value5}}</h5>
      <Slider v-model="value5" :range="true" />
      <div v-for="location in locationsOnDisplay" :key="location.index">
        <Card @mouseover="setOnZoom(location.index)" @mouseleave="unSetOnZoom(location.index)" class="smallerCard p-card-body p-card-content p-card:hover" >
          <template #content >
            <div class="grid" >
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
import { watch, ref } from "vue";

export default {
  components: {
    ActiveSideBar,
  },
  setup() {
    const locations = useLocations();
    const { unSetOnZoom, setOnZoom }= locations;
    const { locationsOnDisplay } = storeToRefs(locations);
    const value5 = ref([20,80]);
    const visibleRight = ref(false);

    watch(locationsOnDisplay, () => console.log("changes on elements"));
 
    return {
      unSetOnZoom, 
      setOnZoom,
      locationsOnDisplay,
      value5,
      visibleRight,
    };
  },
};
</script>


<style>

.smallerCard{
    
    padding-bottom: 0.1rem;
    padding-top: 0.1rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem; 
}

.p-card-content .p-card-body {
    padding-bottom: 0.0rem;
    padding-top: 0.0rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem; 
}

.p-divider.p-divider-horizontal{
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
}

.overlyMngmt{
    background-color: rgb(231, 243, 248);
}

.p-card:hover{
    background: #ecedf7;
    color: #495057;
    box-shadow: 0 10px 10px -1px rgba(0, 0, 0, 0.1), 
                0 10px 10px 0 rgba(0, 0, 0, 0.1), 
                0 10px 10px 0 rgba(0, 0, 0, 0.1),
                0 10px 10px 0 rgba(0, 0, 0, 0.1);                
    border-radius: 6px;

}


</style>