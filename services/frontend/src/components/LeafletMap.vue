<template>
  <div>
    <div style="position: relative">
      <div style="height: 85vh; width: auto">
        <l-map
          :zoom="zoomM"
          :center="[48.1871387, 16.3577628]"
          :options="{ zoomControl: false }"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>

          <!-- bringing down the zoom buttons -->
          <l-control-zoom position="bottomright"></l-control-zoom>

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
            <div v-if="location.zoom == true">
              <l-marker
                :lat-lng="[location.lat, location.lon]"
                :icon="house"
                :zIndexOffset="poiArea.length * 100"
              >
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
          <!-- butto for the houses -->
          <l-control position="topright" class="buttonrighttop">
            <OverlaySidebar></OverlaySidebar>
          </l-control>

          <!-- butto for the houses -->
          <l-control position="topleft" class="buttonrighttop">
            <OverlaySidebarLeft></OverlaySidebarLeft>
          </l-control>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LGeoJson,
  LControl,
  LControlZoom,
} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";
import { useLocations } from "@/stores/locations";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { icon } from "leaflet";

import OverlaySidebar from "./OverlaySidebar.vue";
import OverlaySidebarLeft from "./OverlaySidebarLeft.vue";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LMarker,
    LTileLayer,
    LPopup,
    LGeoJson,
    LControlZoom,
    OverlaySidebar,
    OverlaySidebarLeft,
    LControl,
  },
  setup() {
    const locations = useLocations();
    const { locationsOnDisplay, solutions, poiArea } = storeToRefs(locations);
    const zoomM = ref(13);

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

<style scoped></style>
