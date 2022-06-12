import axios from 'axios';
import { defineStore } from 'pinia';
import router from '../router';

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
            console.log("registering")
            const userForm_ = this.$state.userForm;
            await axios.post('register', userForm_).then(this.logIn());

        },
        async logIn() {
            var bodyFormData = new FormData();
            bodyFormData.append('username', this.$state.userForm.username);
            bodyFormData.append('password', this.$state.userForm.password);
            await axios({
                method: "post",
                url: "login",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
                config: { "withCredentials": true }
            }).catch(function (response) { console.log(response); })

            await this.viewMe()

            await router.push('/dashboard');

            this.$state.userForm = { "username": "", "password": "" };

        },
        async deleteUser() {
            await axios.delete(`user/${this.$state.user.id}`);
        },
        async logOut() {
            this.$state.user = null;
            this.$state.userForm = { "username": "", "password": "" }
        },
        async viewMe() {
            let { data } = await axios.get('users/whoami');
            this.$state.user = data;

        },
        isAuthenticated() {
            return !!this.$state.user
        },
        stateUser() {
            return this.$state.user
        },

    }
})


