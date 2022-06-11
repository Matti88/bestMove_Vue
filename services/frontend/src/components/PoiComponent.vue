<template>
  <div class="poiCard">
    <div class="poiTitleDelete">
      <div class="poiTitle">
        <div class="title">
          {{ poiTitle }}
        </div>
      </div>
      <div  @click="removePois(id)">
        <div class="deleteVec edit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"
              fill="#597BF5"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="poiAddress">
      <div class="address">
        {{ address }}
      </div>
    </div>
    <div class="poiDetails">
      <div class="modeLogo">
        <LogoTranspModeVue v-bind:mode="modeCode" />
      </div>
      <div class="timeText">{{ time }} min</div>
    </div>
  </div>
</template>

<script>
import LogoTranspModeVue from "./LogoTranspMode.vue";
import { useLocations } from "@/stores/locations";

export default {
  props: {
    poiTitle: String,
    address: String,
    modeCode: String,
    time: Number,
    id: Number,
  },
  components: {
    LogoTranspModeVue,
  },
  setup() {
    const locationsPois = useLocations();
    const { removePois } = locationsPois;

    return { removePois };
  },
};
</script>

<style scoped>
.poiCard {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 4px;
  /* background: #ffffff; */
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;


  

}

.poiTitleDelete {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  height: 25px;
}

.poiAddress {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px 0px;
  gap: 10px;
  width: 307px;
  height: 40px;
}

.poiDetails {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 0px;
  gap: 10px;
  width: 307px;
  height: 39px;
}

.poiTitle {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 279px;
  height: 25px;
}

.title {
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #000000;
}

.deleteVec {
  width: 24px;
  height: 24px;
}

.address {
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */
  color: #8a92a6;
}

.modeLogo {
  width: 24px;
  height: 24px;
}
.timeText {
  width: 54px;
  height: 21px;
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  color: #000000;
}
.editButton {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  width: 47px;
  height: 27px;

  background: rgba(58, 87, 232, 0.1);
  border: 1px solid #597BF5;
  border-radius: 8px;
}

.edit {
  width: 31px;
  height: 19px;

  font-family: "Arial";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #597BF5;
}
</style>
