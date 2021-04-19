<template>
    <div class="photo">
        <h1>{{this.photo.title}}</h1>
        <h3>{{this.photo.user.username}}</h3>
        <p>{{formatDate(photo.created)}}</p>
        <img :src="photo.path" class="img-fluid" alt="Responsive image">
        <p>{{photo.description}}</p>
        <Comments />
    </div>
</template>

<script>
import Comments from '@/components/Comments.vue';
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Photo',

    components: {
        Comments
    },

    data() {
        return {
            photo: Object
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
