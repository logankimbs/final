<template>
    <div class="home">
        <h2>Explore</h2>
        <Gallery :photos="photos" />
    </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue';
import axios from 'axios';

export default {
    name: 'Home',
    
    components: {
        Gallery
    },

    data() {
        return {
            photos: []
        }
    },

    created() {
        this.getAllPhotos();
        this.getUser();
    },

    methods: {
        async getAllPhotos() {
            try {
                let response = await axios.get('/api/photos/all');
                this.photos = response.data;
            } catch (error) {  console.log(error);  }
        },

        async getUser() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {  this.$root.$data.user = null;  }
        }
    }
}
</script>