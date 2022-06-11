<template>
  <section>
    <h1>Your Profile</h1>
    <hr />
    <br />
    <div>
      <p>
        <strong>Full Name:</strong> <span>{{ userForm.full_name }}</span>
      </p>
      <p>
        <strong>Username:</strong> <span>{{ userForm.username }}</span>
      </p>
      <p>
        <button @click="deleteUser()" class="btn btn-primary">
          Delete Account
        </button>
      </p>
    </div>
  </section>
</template>

<script>
import { usersState } from "../stores/user.js";
import { storeToRefs } from "pinia";
const log = usersState();

export default {
  setup() {
    const { deleteUser } = log;
    const { userForm } = storeToRefs(log);

    return {
      deleteUser,
      userForm,
    };
  },
};
</script>
