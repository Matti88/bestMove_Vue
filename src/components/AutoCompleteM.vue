<template>
  <div >
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText type="text" v-model="searchString"  />
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
</template>


<script>
import { storeToRefs } from "pinia";
import { useSearchItems } from "@/stores/searchItem";
import { defineComponent } from "@vue/runtime-core";
import { debounce } from "lodash";
import { watch } from "vue";

export default defineComponent({
  setup() {
    const searchStore = useSearchItems();
    const { searchString, 
            results, 
            isOpen, 
            mode, 
            range } = storeToRefs(searchStore);
    const { queryResults, 
            setSingleResults, 
            reset, 
            setMode, 
            commitPOIresult } = searchStore;

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