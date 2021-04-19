<template>
    <div class="photo">
        <div class="mb-2" v-if="checkUser()">
            <button class="btn btn-primary me-2" to="/profile" @click="toggleUpdater(true)">Edit</button>
            <router-link to="/profile">
                <button class="btn btn-outline-danger me-2" to="/profile" @click="deletePhoto()">Delete</button>
            </router-link>
        </div>
        
        <Updater :photo="photo" :show="show" @close="close" @updateFinished="updateFinished" />

        <h1>{{this.photo.title}}</h1>
        <h3>{{this.photo.user.username}}</h3>
        <p>{{formatDate(photo.created)}}</p>
        <img :src="photo.path" class="img-fluid" alt="Responsive image">
        <p>{{photo.description}}</p>
        <Comments />
    </div>
</template>

<script>
import Updater from '@/components/Updater.vue';
import Comments from '@/components/Comments.vue';
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Photo',

    components: {
        Updater,
        Comments
    },

    data() {
        return {
            photo: Object,
            show: false
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

        checkUser() {
            if (this.photo.user._id != this.$root.$data.user._id) {
                return false;
            } else {
                return true;
            }
        },
        
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15) {
                return moment(date).fromNow();
            } else {
                return moment(date).format('d MMMM YYYY');
            }
        },

        async deletePhoto() {
            try {
                await axios.delete(`/api/photos/${this.$route.params.id}`);
            } catch (error) { console.log(error);  }
        },

        toggleUpdater(value) {
            this.show = value;
        },

        close() {
            this.show = false;
        },

        async updateFinished() {
            this.show = false;
            this.getPhoto();
        }
    }
}
</script>
