<template>
  <div class="grid">
    <div class="col-12 lg:col-3 xl:col-3">
      <SearchThingy />
      <PoiSummary />
      <RoutesAreasOps />
    </div>
    <div class="col-12 lg:col-9 xl:col-9">
      <div class="card mb-0">
        <LeafletMap />
      </div>
    </div>
  </div>
</template>



<script >
import EventBus from "@/AppEventBus";
import ProductService from "../service/ProductService";

//Imports of all my custom components
import SearchThingy from "./SearchThingy.vue";
// import ApiKeyInsert from "./ApiKeyInsert.vue"
//import UploadExcelFile from "./UploadExcelFile.vue"
import RoutesAreasOps from "./RoutesAreasOps.vue";
import PoiSummary from "./PoiSummary.vue";
// import TableHouses from "./TableHouses.vue";
import LeafletMap from "./LeafletMap.vue";

import CountryService from "../service/CountryService";
import NodeService from "../service/NodeService";


export default {
  components: {
    SearchThingy,
    RoutesAreasOps,
    PoiSummary,
    LeafletMap,
  },

  data() {
    return {
      countryService: null,
      nodeService: null,

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
  mounted() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.themeChangeListener = (event) => {
      if (event.dark) this.applyDarkTheme();
      else this.applyLightTheme();
    };
    EventBus.on("change-theme", this.themeChangeListener);

    if (this.isDarkTheme()) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  },
  beforeUnmount() {
    EventBus.off("change-theme", this.themeChangeListener);
  },
  created() {
    this.productService = new ProductService();
  },
  methods: {
    created() {
      this.countryService = new CountryService();
      this.nodeService = new NodeService();
    },
    mounted() {
      this.countryService
        .getCountries()
        .then((data) => (this.autoValue = data));
      this.nodeService
        .getTreeNodes()
        .then((data) => (this.treeSelectNodes = data));
    },
    searchCountry(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.autoFilteredValue = [...this.autoValue];
        } else {
          this.autoFilteredValue = this.autoValue.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    },

    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      };
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
        },
      };
    },
  },
};
</script>

 
 