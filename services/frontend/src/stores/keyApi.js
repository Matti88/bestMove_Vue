//store for the API_Key

import { defineStore } from 'pinia'

export const useKeyApi = defineStore({
  id: 'keyApi',
  state: () => ({
    InsertedAPIstring: "",
    ConfirmedAPIstring: ""
  }),
  actions: {
    confirmKey() {
      this.$patch(
        {
          ConfirmedAPIstring: this.$state.InsertedAPIstring
        })
    },
    getConfirmation() {
      const confirmation = !(this.$state.ConfirmedAPIstring == "");
      return confirmation
    },
    resetKey() {
      this.$patch(
        {
          InsertedAPIstring: "",
          ConfirmedAPIstring: ""
        }
      )
    }
  }
})
