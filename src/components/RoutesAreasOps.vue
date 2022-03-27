<template>
    <div class="card p-fluid">
      <h4>Houses within Areas </h4>
      <Button label="Primary" class="mr-1 mb-2" @click="searchOptimal">Within Area</button>
      <Button  label="Secondary" class="mr-1 mb-2 p-button-secondary" @click="printSearch">All</button>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { useLocations } from "@/stores/locations";


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
      printSearch,
    } = locations;
    return {
      onChangeF,
      searchOptimal,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
      printMatrix,
      printSearch,
    };
  },
});
</script>
