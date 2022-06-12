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
            console.log("registering")
            const userForm_ = this.$state.userForm;
            await axios.post('register', userForm_).then(this.logIn());

        },
        async logIn() {
            var bodyFormData = new FormData();
            bodyFormData.append('username', this.$state.userForm.username);
            bodyFormData.append('password', this.$state.userForm.password);
            console.log("something happened on the way to heaven");
            const { data } =
                await axios({
                    method: "post",
                    url: "login",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                    config: { "withCredentials": true }
                })
                    .then(function (response) {
                        //handle success
                        console.log(response);
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });

            axios.default.headers.common['Authorization'] = `Bearer ${data.token}`;

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


