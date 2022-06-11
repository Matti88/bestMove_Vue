<template>
  <div>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          name="username"
          class="form-control"
          v-model="userForm.username"
        />
      </div>
      <div class="mb-3">
        <label for="full_name" class="form-label">Full Name:</label>
        <input
          type="text"
          name="full_name"
          :model="userForm.full_name"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          name="password"
          :model="userForm.password"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { usersState } from "../stores/user";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const log = usersState();
    const { register } = log;
    const { userForm } = storeToRefs(log);

    return {
      register,
      userForm,
    };
  },
};
</script>
