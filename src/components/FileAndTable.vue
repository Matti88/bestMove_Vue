<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h3>Import XLSX</h3>
        <input
          type="file"
          @change="onChangeF"
          class="p-button-link mr-2 mb-2"
        />
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Loaded Houses</h5>
          <DataTable :value="locations.locationsList" sortField="dynamicSortField" >
            <Column field="address" header="address" :sortable="true"></Column>
            <Column field="price" header="price" :sortable="true"></Column>
            <Column field="sqm" header="sqm" :sortable="true"></Column>
          </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import CustomerService from "../service/CustomerService";
import ProductService from "../service/ProductService";
import { useLocations } from "@/stores/locations";

export default {
 
  customerService: null,
  productService: null,
  created() {
    this.customerService = new CustomerService();
    this.productService = new ProductService();
    this.initFilters1();
  },
  mounted() {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data) => (this.products = data));
    this.customerService.getCustomersLarge().then((data) => {
      this.customer1 = data;
      this.loading1 = false;
      this.customer1.forEach(
        (customer) => (customer.date = new Date(customer.date))
      );
    });
    this.customerService
      .getCustomersLarge()
      .then((data) => (this.customer2 = data));
    this.customerService
      .getCustomersMedium()
      .then((data) => (this.customer3 = data));
    this.loading2 = false;
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        "country.name": {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
    clearFilter1() {
      this.initFilters1();
    },
    expandAll() {
      this.expandedRows = this.products.filter((p) => p.id);
    },
    collapseAll() {
      this.expandedRows = null;
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    calculateCustomerTotal(name) {
      let total = 0;
      if (this.customer3) {
        for (let customer of this.customer3) {
          if (customer.representative.name === name) {
            total++;
          }
        }
      }

      return total;
    },
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },
  },
  setup() {
    const locations = useLocations();
    const {
      onChangeF,
      searchOptimal,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
    } = locations;
    return {
		locations,
      onChangeF,
      searchOptimal,
      printResults,
      matrixBestRoutes,
      printMatrixDistances,
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
</style>
