<template>
    <div class="home">
        <Login v-if="!user" />
        <div v-else>
            <Navbar />
            <h1>Explore</h1>
            <Gallery :photos="photos"/>
        </div>
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Navbar from '@/components/Navbar.vue';
import Gallery from '@/components/Gallery.vue';
import axios from 'axios';

export default {
    name: 'Home',
    components: {
        Login,
        Navbar,
        Gallery
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
    data() {
        return {
            photos: []
        }
    },
    created() {
        this.getUser();
        this.getAllPhotos();
    },
    methods: {
        async getUser() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },

        async getAllPhotos() {
            try {
                this.response = await axios.get("/api/photos");
                this.photos = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        }
    }
}
</script>