<template>
  <div>
    <div class="col-12">
      <div class="card">
        <h5>This is the API Key input</h5>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <Button @click="confirmKey" label="Confrim" />
              <Button @click="resetKey" label="Reset" />
              <InputText placeholder="Keyword" v-model="InsertedAPIstring" />
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
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "apiKeyInsert",
  setup() {
    const apiKey = useKeyApi();
    const { InsertedAPIstring, ConfirmedAPIstring } = storeToRefs(apiKey);
    const { confirmKey, resetKey } = apiKey;
    return { InsertedAPIstring, ConfirmedAPIstring, confirmKey, resetKey };
  },
});
</script>