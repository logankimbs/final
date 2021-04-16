<template>
    <div class="text-center">
        <div class="form-signin" v-if="show">
            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Username" v-model="usernameToLogin">
                </div>
                <div class="mb-2">
                    <input type="password" class="form-control" placeholder="Password" v-model="passwordToLogin">
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary" @click="loginUser()">Log In</button>
                </div>
                <hr>
            </form>
            <button class="btn btn-success btn-sm" @click="setShow(false)">Create New Account</button>
        </div>
        
        <div class="form-signup" v-else>
            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="First name" v-model="firstName">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Last name" v-model="lastName">
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Username" v-model="username">
                </div>
                <div class="mb-2">
                    <input type="password" class="form-control" placeholder="New Password" v-model="password">
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary" @click="createUser()">Sign Up</button>
                </div>
                <hr>
            </form>
            <button class="btn btn-success btn-sm" @click="setShow(true)">Log In</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            show: true,
            usernameToLogin: '',
            passwordToLogin: '',
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        }
    },
    methods: {
        async loginUser() {
            if (!this.usernameToLogin || !this.passwordToLogin) {  return;  }
            try {
                let response = await axios.post('/api/users/login', {
                    username: this.usernameToLogin,
                    password: this.passwordToLogin,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },

        async createUser() {
            if (!this.firstName || !this.lastName || !this.username || !this.password) {  return;  }
            try {
                let response = await axios.post('/api/users', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },

        setShow(value) {
            this.show = value;
        }
    }
}
</script>

<style scoped>
.form-signin,
.form-signup {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
</style>