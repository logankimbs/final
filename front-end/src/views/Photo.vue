<template>
    <div class="photo">
        <h1>{{this.photo.title}}</h1>
        <h3>{{this.photo.user.username}}</h3>
        <p>{{this.formatDate(this.photo.created)}}</p>
        <img :src="photo.path" class="img-fluid" alt="Responsive image">
        <p>{{this.photo.description}}</p>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

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
        },

        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15) {
                return moment(date).fromNow();
            } else {
                return moment(date).format('d MMMM YYYY');
            }
        }
    }
}
</script>