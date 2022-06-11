<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          name="username"
          v-model="userForm.username"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          name="password"
          v-model="userForm.password"
          class="form-control"
        />
      </div>
      <button type="submit" @click="logIn" class="btn btn-primary">
        Submit
      </button>
    </form>
  </section>
</template>

<script>
import { usersState } from "../stores/user.js";
import { storeToRefs } from "pinia";
const log = usersState();

export default {
  setup() {
    const { logIn } = log;
    const { userForm } = storeToRefs(log);

    return {
      logIn,
      userForm,
    };
  },
};
</script>
