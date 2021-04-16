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
                    <button type="submit" class="btn btn-primary" @click.prevent="loginUser()">Log In</button>
                </div>
                <div class="alert alert-danger mt-3 text-start" role="alert" v-if="errorToLogin">{{this.errorToLogin}}</div>
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
                    <button type="submit" class="btn btn-primary" @click.prevent="createUser()">Sign Up</button>
                </div>
                <div class="alert alert-danger mt-3 text-start" role="alert" v-if="error">{{this.error}}</div>
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
            errorToLogin: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async loginUser() {
            this.errorToLogin = '';
            this.error = '';
            if (!this.usernameToLogin || !this.passwordToLogin) {  return;  }
            try {
                let response = await axios.post('/api/users/login', {
                    username: this.usernameToLogin,
                    password: this.passwordToLogin,
                });
                this.$root.$data.user = response.data.user;
                this.usernameToLogin = '';
                this.passwordToLogin = '';
            } catch (error) {
                this.errorToLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        },

        async createUser() {
            this.errorToLogin = '';
            this.error = '';
            if (!this.firstName || !this.lastName || !this.username || !this.password) {  return;  }
            try {
                let response = await axios.post('/api/users', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                });
                this.$root.$data.user = response.data.user;
                this.firstName = '';
                this.lastName = '';
                this.username = '';
                this.password = '';
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        },

        setShow(value) {
            this.show = value;
            this.usernameToLogin = '';
            this.passwordToLogin = '';
            this.errorToLogin = '';
            this.firstName = '';
            this.lastName = '';
            this.username = '';
            this.password = '';
            this.error = '';
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