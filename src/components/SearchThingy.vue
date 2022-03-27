/* seeking for help
 https://www.digitalocean.com/community/tutorials/vuejs-vue-autocomplete-component
*/
<template>
  <div class="card p-fluid">
    <h5>Point Of Interest</h5>
    <div class="field grid">
      
     <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">Address</label>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText type="text" v-model="searchString" />
        </span>

        <ul v-show="isOpen">
          <li
            v-for="result in results"
            :key="result.place_id"
            @click="setSingleResults(result)"
          >
            {{ result.properties.formatted }}
          </li>
        </ul>

    </div>
    <div class="field grid">
      <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">Timing</label>
      <div class="col-12 md:col-10">
        <Dropdown
          v-model="range"
          :options="timeRanges"
          optionLabel="name"
          placeholder="No Time"
        />
      </div>
    </div>

    <div class="field grid">
      <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">Transport</label>
      <div class="col-12 md:col-10">
        <SelectButton
          v-model="mode"
          :options="modeTransport"
          optionLabel="name"
        />
      </div>
    </div>

    <h5>Commit POI</h5>
    <Button label="Commit" @click="commitPOIresult" ></Button>
  </div>
</template>

 
<script>
import { storeToRefs } from "pinia";
import { useSearchItems } from "@/stores/searchItem";
import { defineComponent } from "@vue/runtime-core";
import { debounce } from "lodash";
import { watch } from "vue";
// import AutoCompleteM from "./AutoCompleteM.vue";

export default defineComponent({
  name: "SearchThinghy",
  data() {
    return {
      selectedAutoValue: null,
      autoFilteredValue: [],
      modeTransport: [
        { name: "Car", code: "drive" },
        { name: "Public Trans", code: "transit" },
        { name: "Walk", code: "walk" },
        { name: "Bicycle", code: "bicycle" },
      ],
      timeRanges: [
        { name: "5 min", code: "300" },
        { name: "10 min", code: "600" },
        { name: "15 min", code: "900" },
        { name: "20 min", code: "1200" },
        { name: "25 min", code: "1500" },
        { name: "30 min", code: "1800" },
      ],
      dropdownValue: null,
    };
  },
 
  setup() {
    const searchItems = useSearchItems();
    const { searchString, results, isOpen, mode, range } = storeToRefs(searchItems);
    const { queryResults, setSingleResults, reset, setMode, commitPOIresult } = searchItems;

    watch(() => searchString.value, debounce(queryResults, 2000));

    return {
      searchString,
      results,
      isOpen,
      setSingleResults,
      reset,
      setMode,
      commitPOIresult,
      mode,
      range,
    };
  },
});
</script>