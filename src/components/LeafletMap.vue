<template>
  <div style="height: 750px; width: auto">
    <l-map :zoom="zoomM" :center="[48.1871387, 16.3577628]">


      <div v-if="poiArea.length > 0">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-geo-json
          v-for="poi in poiArea"
          :key="poi.geoApify.properties.id"
          :geojson="poi.geoApify"
          :options="{color: poi.poi.isoParams.color}"
        >
        </l-geo-json>    
          <l-marker
            v-for="poi in poiArea"
            :key="poi.poi.id"
            :lat-lng="[poi.poi.geoObject.properties.lat, poi.poi.geoObject.properties.lon]"
            :icon="icon"
          >
          </l-marker>
      </div>
      <div v-if="solutions.housesAllPoi.length > 0">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-geo-json
          v-for="poi in poiArea"
          :key="poi.geoApify.properties.id"
          :geojson="poi.geoApify"
          :options="{color: poi.poi.isoParams.color}"
        ></l-geo-json>
        <!-- <div
          v-for="matchings in solutions.housesAllPoi"
          :key="matchings.index"> -->
          <l-marker
            v-for="location in solutions.housesAllPoi"
            :key="location.index"
            :lat-lng="[location.lat, location.lon]"
          >
          
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
        <!-- </div> -->

      </div>
      <div v-else>
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="location in locationsList"
          :key="location.index"
          :lat-lng="[location.lat, location.lon]"
          
        >
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

    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  // LIcon,
  LTileLayer,
  LMarker,
  // LControlLayers,
  // LTooltip,
  LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocations } from "@/stores/locations";
import { usePoiApi } from "@/stores/poi";
import {  ref } from "vue";
import { storeToRefs } from "pinia";
import { icon } from "leaflet";



export default {
  name: "LeafletMap",
  components: {
    LMap,
    LMarker,
    // LIcon,
    LTileLayer,
    // LControlLayers,
    // LTooltip,
    LPopup,
    // LPolyline,
    // LPolygon,
    // LRectangle,
    LGeoJson,
  },
  setup() {
    const locations = useLocations();
    const poi  = usePoiApi();
    const { locationsList, solutions,  } = storeToRefs(locations);
    const { poiArea} = storeToRefs(poi);
    const zoomM = ref(13);

    return {
      zoomM,
 
      locationsList,
      solutions,
      poiArea, 

      icon: icon({
        iconUrl: require("/public/map-marker-blue.svg"),
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      }),

      house: icon({
        iconUrl: require("/public/house.svg"),
        iconSize: [40, 40],
        iconAnchor: [16, 37]
      }),

      staticAnchor: [16, 37],
      customText: "Foobar",
      iconSize: 64
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  },

};
</script>