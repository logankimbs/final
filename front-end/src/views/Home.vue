<template>
    <div class="home">
        <Login v-if="!user"/>
        <div v-else>
            <button class="btn btn-primary" @click="logoutUser()">Logout</button>
        </div>
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import axios from 'axios';

export default {
    name: 'Home',
    components: {
        Login
    },
    async created() {
        try {
            let response = await axios.get('/api/users');
            this.$root.$data.user = response.data.user;
        } catch (error) {
            this.$root.$data.user = null;
        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
    methods: {
        async logoutUser() {
            try {
                await axios.delete("/api/users");
                this.$root.$data.user = null;
            } catch (error) {
                this.$root.$data.user = null;
            }
        }
    }
}
</script>