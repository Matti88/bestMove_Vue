<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <span>Home</span>
    </router-link>
    <router-link to="/ApiKeyInsert" class="layout-topbar-logo">
      <span>File Page</span>
    </router-link>
    <router-link to="/FileAndTable" class="layout-topbar-logo">
      <span>API Insert</span>
    </router-link>

    <router-link to="/register" class="layout-topbar-logo">
      <span>Register</span>
    </router-link>
    <router-link to="/login" class="layout-topbar-logo">
      <span>Login</span>
    </router-link>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo-dark.svg";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>
