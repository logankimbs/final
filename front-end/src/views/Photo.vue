<template>
    <div class="photo">
        <img :src="photo.path" class="img-fluid" alt="Responsive image">
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Photo',

    data() {
        return {
            photo: null
        }
    },

    created() {
        this.getPhoto();
        this.getUser();
    },

    methods: {
        async getPhoto() {
            try {
                let response = await axios.get(`/api/photos/${this.$route.params.id}`);
                this.photo = response.data;
                console.log(this.photo);
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