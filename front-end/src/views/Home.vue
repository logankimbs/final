<template>
    <div class="home">
        <Login v-if="!user" />
        <Dashboard v-else />
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import axios from 'axios';

export default {
    name: 'Home',
    components: {
        Login,
        Dashboard
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
    }
}
</script>