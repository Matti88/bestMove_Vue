<template>
  <div>
    <div class="col-12">
      <div class="card">
        <h5>This is the API Key input</h5>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <PrimeButton @click="confirmKey" label="Confrim" class="" />
              <PrimeButton @click="resetKey" label="Reset" />
              <PrimeInputText
                placeholder="Keyword"
                v-model="InsertedAPIstring"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useKeyApi } from "@/stores/keyApi";

export default {
  name: "apiKeyInsert",
  setup() {
    const apiKey = useKeyApi();
    const { InsertedAPIstring, ConfirmedAPIstring } = storeToRefs(apiKey);
    const { confirmKey, resetKey } = apiKey;
    return { InsertedAPIstring, ConfirmedAPIstring, confirmKey, resetKey };
  },
};
</script>

<style scoped>
.p-button {
  background: #597bf5;
}
</style>
