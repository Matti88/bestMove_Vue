<template>
<div style="with: auto; height:700px">
    <h3>Table with Available Houses</h3>
  <table-lite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="locationsList"
    :total="table.totalRecordCount" 
    :messages="table.messages" 
    @is-finished="table.isLoading = false"
  ></table-lite>
</div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import TableLite from "vue3-table-lite";
import { useLocations } from "@/stores/locations";
import { storeToRefs } from 'pinia';
   
export default defineComponent({
  name: "TableHouses",
  components: { TableLite },
  setup() {

    //data sourcing
    const locations = useLocations();
    const {printHouses} = locations;
    const { locationsList  } = storeToRefs(locations);

    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "index",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "hlink",
          field: "hlink",
          width: "3%",
          sortable: true,
        },
        {
          label: "himage",
          field: "himage",
          width: "3%",
          sortable: true,
          display: function (row) {
            return (
            '<img src="'+ row.himage + '" style="padding: 5px;width:150px;border: 1px solid #ddd;border-radius: 4px;">' 
            );}
        },
        {
          label: "lon",
          field: "lon",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "lat",
          field: "lat",
          width: "3%",
          sortable: true,
        },
        {
          label: "address",
          field: "address",
          width: "3%",
          sortable: true,
        },
        {
          label: "price",
          field: "price",
          width: "3%",
          sortable: true,
        },
        {
          label: "sqm",
          field: "sqm",
          width: "3%",
          sortable: true,
        },

      ],
      rows: [],
      totalRecordCount: 0,
    });

 
 
    return {
      table, 
      printHouses,
      locationsList,
       
    };
  },
});
</script>
