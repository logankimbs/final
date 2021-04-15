<template>
    <form class="login">
        <fieldset>
            <legend>Login</legend>
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="Password" v-model="password">
            <button type="submit" @click.prevent="loginUser()">Login</button>
        </fieldset>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async loginUser() {
            if (!this.username || !this.password) {
                return;
            } else {
                try {
                    let response = await axios.post('/api/users/login', {
                        username: this.username,
                        password: this.password
                    });
                    this.$root.$data.user = response.data.user;
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