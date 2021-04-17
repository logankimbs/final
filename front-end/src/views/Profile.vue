<template>
    <div class="profile">
        <Navbar />
        <Gallery :photos="photos"/>
        <Add />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Gallery from '@/components/Gallery.vue';
import Add from '@/components/Add.vue';
import axios from 'axios';

export default {
    name: 'Profile',
    components: {
        Navbar,
        Gallery,
        Add
    },
    created() {
        this.getPhotos();
    },
    data() {
        return {
            photos: [],
            error: ''
        }
    },
    methods: {
        async getPhotos() {
            try {
                this.response = await axios.get("/api/photos");
                this.photos = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }

            console.log(this.photos);
        },
    }
}
</script>