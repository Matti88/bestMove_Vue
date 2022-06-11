<template>
  <div>
    <LeafletMap />
  </div>
</template>

<script>  
import LeafletMap from "./LeafletMap.vue";  

export default {
  components: { 
    LeafletMap,
  },

  data() {
    return {  

      products: null,
      selectButtonValue1: null,

      selectedAutoValue: null,
      autoFilteredValue: [],

      selectButtonValues1: [
        { name: "Car", code: "O1" },
        { name: "Public Transport", code: "O2" },
        { name: "Walk", code: "O3" },
        { name: "Public T++", code: "O4" },
      ],
      dropdownValues: [
        { name: "5 min", code: "300" },
        { name: "10 min", code: "600" },
        { name: "15 min", code: "900" },
        { name: "20 min", code: "1200" },
        { name: "25 min", code: "1500" },
        { name: "30 min", code: "1800" },
      ],
      dropdownValue: null,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
          },
          {
            label: "Sales",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      items: [
        { label: "Add New", icon: "pi pi-fw pi-plus" },
        { label: "Remove", icon: "pi pi-fw pi-minus" },
      ],
      lineOptions: null,
    };
  },
  productService: null,
  themeChangeListener: null,
  
};
</script>

<style scoped>
.buttonToTheright {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
