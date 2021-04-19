<template>
    <div class="user-profile">
        <h2 class="pb-2">{{this.$root.$data.user.username}}</h2>
        <h5 class="mt-3 text-muted" v-if="photos.length == 0">Looks like you haven't added any photos yet.</h5>
        <Gallery :photos="photos" />
        <button class="btn btn-link btn-floating" @click="toggleAdder(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </button>
        <Adder :show="show" @close="close" @uploadFinished="uploadFinished" />
    </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue';
import Adder from '@/components/Adder.vue';
import axios from 'axios';

export default {
    name: 'UserProfile',

    components: {
        Gallery,
        Adder
    },

    data() {
        return {
            photos: [],
            show: false
        }
    },

    created() {
        this.getUserPhotos();
        this.getUser();
    },

    methods: {
        async getUserPhotos() {
            try {
                let response = await axios.get('/api/photos/');
                this.photos = response.data;
            } catch (error) {  /* console.log(error); */  }
        },

        async getUser() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {  this.$root.$data.user = null;  }
        },

        toggleAdder(value) {
            this.show = value;
        },

        close() {
            this.show = false;
        },

        async uploadFinished() {
            this.show = false;
            this.getUserPhotos();
        }
    }
}
</script>

<style scoped>
.btn-floating {
    position: fixed;
    z-index: 1030;
    bottom: 1.5rem;
    right: 1.5rem;
}
</style>