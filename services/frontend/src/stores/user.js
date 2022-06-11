import axios from 'axios';
import { defineStore } from 'pinia';

export const usersState = defineStore({
    id: 'users',
    state: () => ({
        "user": null,
        "userForm": {
            "username": "",
            "full_name": "",
            "password": ""
        }
    }),

    actions: {
        async register() {
            const userForm_ = this.$state.userForm;
            await axios.post('register', userForm_);
            this.logIn();
        },
        async logIn() {
            const userForm_ = this.$state.userForm;
            await axios.post('login', userForm_);
            this.viewMe();
            this.$state.userForm = { "username": "", "password": "" }
        },
        async viewMe() {
            this.user = await axios.get('users/whoami');
        },
        async deleteUser() {
            await axios.delete(`user/${this.$state.user.id}`);
        },
        async logOut() {
            this.$state.user = null;
            this.$state.userForm = { "username": "", "password": "" }
        },
        isAuthenticated() {
            return !!this.$state.user
        },
        stateUser() {
            return this.$state.user
        }
    }
})


