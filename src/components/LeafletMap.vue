<template>
  <div style="height: 750px; width: auto">
    <l-map :zoom="zoomM" :center="[48.1871387, 16.3577628]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <div v-if="poiArea.length > 0">
        <l-geo-json
          v-for="poi in poiArea"
          :key="poi.geoApify.properties.id"
          :geojson="poi.geoApify"
          :options="{ color: poi.poi.isoParams.color }"
        >
        </l-geo-json>
        <l-marker
          v-for="poi in poiArea"
          :key="poi.poi.id"
          :lat-lng="[
            poi.poi.geoObject.properties.lat,
            poi.poi.geoObject.properties.lon,
          ]"
          :icon="icon"
        >
        </l-marker>
      </div>
      <l-geo-json
        v-for="poi in poiArea"
        :key="poi.geoApify.properties.id"
        :geojson="poi.geoApify"
        :options="{ color: poi.poi.isoParams.color }"
      ></l-geo-json>

      <div v-for="location in locationsOnDisplay" :key="location.index">
        <!-- if this is ON zoom -->
        <div v-if="location.zoom == true ">
          <l-marker :lat-lng="[location.lat, location.lon]" :icon="house" :zIndexOffset="poiArea.length * 1000">
          </l-marker>
        </div>

        <!-- if this is not on zoom -->
        <div v-else> 
        <l-marker :lat-lng="[location.lat, location.lon]">
          <l-popup>
            <a v-bind:href="location.hlink">
              <img
                v-bind:src="location.himage"
                alt="home"
                width="150"
                height="90"
              />
            </a>
            <br />
            <p>Rent: {{ location.price }}</p>
            <p>Area: {{ location.sqm }}</p>
          </l-popup>
        </l-marker>
        </div>
      </div>


    </l-map>
  </div>
</template>




<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocations } from "@/stores/locations";
import { usePoiApi } from "@/stores/poi";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { icon } from "leaflet";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LMarker,
    LTileLayer,
    LPopup,
    LGeoJson,
  },
  setup() {
    const locations = useLocations();
    const poi = usePoiApi();
    const { locationsOnDisplay, solutions } = storeToRefs(locations);
    const { poiArea } = storeToRefs(poi);
    const zoomM = ref(13);

    watch(locationsOnDisplay, () => console.log("changes on elements"));

    return {
      zoomM,
      locationsOnDisplay,
      solutions,
      poiArea,
      icon: icon({
        iconUrl: require("/public/map-marker-blue.svg"),
        iconSize: [50, 50],
        iconAnchor: [16, 37],
      }),
      house: icon({
        iconUrl: require("/public/house.svg"),
        iconSize: [40, 40],
        iconAnchor: [16, 37],
      }),
      staticAnchor: [16, 37],
      customText: "Foobar",
      iconSize: 64,
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
};
</script>