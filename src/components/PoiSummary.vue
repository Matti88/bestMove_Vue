<template>
  <div class="card p-fluid">
    <div>
      <h5>POI Summary</h5>
      <Card
        v-for="result in poiArea"
        :key="result.poi.id"
      >
        <template #content>
          <div class="grid p-fluid">
            <div class="col-12 md:col-12">
              <h5>{{ result.poi.geoObject.properties.formatted }}</h5>
            </div>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                {{ result.poi.isoParams.mode.name }}
              </span>
              <span class="p-inputgroup-addon">
                {{ result.poi.isoParams.range.name }}
              </span>
              <Button
                :id="result.poi.id"
                @click="removePois(result.poi.id)"
              >
                remove
              </Button>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template> 

<script>
import { storeToRefs } from "pinia";
import { usePoiApi } from "@/stores/poi";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "PoiSummary",
  setup() {
    const poiStore = usePoiApi();
    const { poiArea } = storeToRefs(poiStore);
    const { removePois } = poiStore;
    return { poiArea, removePois };
  },
});
</script>