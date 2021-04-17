<template>
    <div class="profile">
        <Login v-if="!this.$root.$data.user" />
        <UserProfile v-else />
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import UserProfile from '@/components/UserProfile.vue';
import axios from 'axios';

export default {
    name: 'Profile',

    components: {
        Login,
        UserProfile
    },

    async created() {
        try {
            let response = await axios.get('/api/users');
            this.$root.$data.user = response.data.user;
        } catch (error) {  this.$root.$data.user = null;  }
    }
}
</script>