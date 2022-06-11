<template>
  <div class="grid">
    <div class="col-12">
      <div class="card orientation">
        <div>
          <h3>Import XLSX</h3>
          <input
            type="file"
            @change="fileUpload"
            class="p-button-link mr-2 mb-2 down"
          />
        </div>

        <b-button @click="resetLocations" class="buttonReset">Reset</b-button>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Loaded Houses</h5>
        <PrimeDataTable
          :value="locations.locationsList"
          sortField="dynamicSortField"
        >
          <PrimeColumn
            field="address"
            header="address"
            :sortable="true"
          ></PrimeColumn>
          <PrimeColumn
            field="price"
            header="price"
            :sortable="true"
          ></PrimeColumn>
          <PrimeColumn field="sqm" header="sqm" :sortable="true"></PrimeColumn>
        </PrimeDataTable>
      </div>
    </div>
  </div>
</template>

<script> 
import { useLocations } from "@/stores/locations";

export default {
 
  setup() {
    const locations = useLocations();
    const {
      fileUpload,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
      resetLocations,
    } = locations;
    return {
      locations,
      fileUpload,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
      resetLocations,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}

.buttonReset {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 8px;
  width: 100px;
  height: 42px;
  right: 27px;
  top: 381px;

  border-radius: 8px;
  font-family: "Arial";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 175%;

  color: #ffffff;
  background-color: #597BF5;;
  border-width: 0px;
}

.orientation {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.down {
  align-items: flex-end;
}
</style>
