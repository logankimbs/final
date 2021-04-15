<template>
    <form class="signup">
        <fieldset>
            <legend>Create New Account</legend>
            <input type="text" placeholder="First name" v-model="firstName">
            <input type="text" placeholder="Last name" v-model="lastName">
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="New password" v-model="password">
            <p></p>
            <button type="submit" @click.prevent="createUser()">Sign Up</button>
        </fieldset>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Signup',
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        }
    },
    methods: {
        async createUser() {
            if (!this.firstName || !this.lastName || !this.username || !this.password) {
                return;
            } else {
                try {
                    let response = await axios.post('/api/users', {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                        password: this.password
                    });
                    this.$root.$data.user = response.data.user;
                    this.firstName = '';
                    this.lastName = '';
                    this.username = '';
                    this.password = '';
                } catch (error) {
                    this.$root.$data.user = null;
                }
            }
        }
    }
}
</script>