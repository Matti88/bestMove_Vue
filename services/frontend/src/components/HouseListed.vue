<template>
  <div class="card">
    <div>
      <img class="image" :src="imagehouse" alt="Italian Trulli" />
    </div>
    <div class="info">
      <div class="infoTop">
        <div class="badgesAddress">
          <div class="badges">
            <div class="indexbadge">
              <div class="badgeBox">
                <div class="hpi">HPI:{{ homepriceindex }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="textAddress">
          {{ address }}
        </div>
      </div>
      <div class="infoButtom">
        <div class="summaryBadges">
          <div class="sqmRoomContainer">
            <div class="sqmInfo">
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8V0H10L13.29 3.29L3.29 13.29L0 10V18H8L4.71 14.71L14.71 4.71L18 8Z"
                    fill="#323232"
                  />
                </svg>
              </div>
              <div class="textdistance">{{ sqm }} m2</div>
            </div>
            <div class="roomInfo">
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3V21H21V3H3ZM11 19H5V13H11V19ZM11 11H5V5H11V11ZM19 19H13V13H19V19ZM19 11H13V5H19V11Z"
                    fill="#323232"
                  />
                </svg>
              </div>
              <div class="textdistance">{{ roomscount }} rooms</div>
            </div>
          </div>
        </div>
        <div class="priceInfo">
          <div class="priceprice">€ {{ price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagehouse: String,
    address: String,
    homepriceindex: Number,
    sqm: Number,
    roomscount: Number,
    price: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* * {

    border: 1px solid black;
}   */

.card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  max-width: auto;
  max-height: 160px;

  /*Card border*/
  /* border: 1px solid black; */
  box-shadow: 0px 10px 20px rgba(17, 38, 146, 0.03);
  border-radius: 12px;

}

.image {
  width: 170px;
  height: 155px;

  background: #8a92a6;
  border-radius: 12px;

  margin-top: 2px;
  margin-left: 2px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 365px;
  height: 177px;
}

.infoTop {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
}

/*bottom part do thie badge info */
.infoButtom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 0px;
  gap: 9px; */
}

.badgesAddress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
}

/*start of the badge*/
.badges {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  gap: 10px;

  width: 100%;
  height: 32px;
}

.indexbadge {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 20px;
}

.starBadge {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 2px;
  margin-top: 3px;
  margin-right: 3px;
  gap: 8px;

  width: 32px;
  height: 32px;

  border: 1px solid #ffb800;
  border-radius: 8px;
}

.hpi {
  width: 62px;
  height: 16px;

  font-family: "Arial";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */

  color: #1b6d28;
}

.badgeBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: auto;
  background: rgba(44, 241, 27, 0.2);
  border-radius: 4px;
}

.textAddress {
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #8a92a6;
}

.summaryBadges {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0px;
  gap: 10px;
}

.sqmRoomContainer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
}

.sqmInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;
}

.roomInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
}

.priceInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}

.textdistance {
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  color: #000000;
}

.priceprice {
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  color: #597BF5;
}
</style>
