<template>
  <div>
    <div class="card p-fluid">
      <h4>Houses within Areas</h4>
        <SelectButton v-model="housesSet" :options="options" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent, watch } from "@vue/runtime-core";
import { useLocations } from "@/stores/locations";
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: "RoutesAreasOps",
 
  setup() {
    const locations = useLocations();
    const {
      onChangeF,
      searchOptimal,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
      printMatrix,
      printSearch ,     setHousesToDisplay
    } = locations;
    
    const {housesSet} = storeToRefs(locations);

    const options = ref(['Houses Filtered POI', 'All Houses']);

    watch(housesSet, () => {setHousesToDisplay()} )

    return {
      onChangeF,
      searchOptimal,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
      printMatrix,
      printSearch,
      housesSet,
      options
    };
  },
});
</script>

 