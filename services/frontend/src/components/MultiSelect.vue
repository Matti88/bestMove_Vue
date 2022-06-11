<template>
  <div class="boxSelect">
    <Multiselect
      v-model="value"
      :options="options"
      :close-on-select="false"
      mode="multiple"
    />
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      options: [
        { value: "batman", label: "Batman" },
        { value: "robin", label: "Robin" },
        { value: "joker", label: "Joker" },
      ],
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">
</style>

