<template>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="photo in photos" :key="photo._id">
            <router-link class="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg" :to="{name: 'Photo', params: {id: photo._id}}" :style="{ backgroundImage: 'url(' + photo.path + ')' }">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{{photo.title}}</h2>
                <ul class="d-flex list-unstyled mt-auto">
                    <li class="d-flex align-items-center me-3">
                        <small>{{photo.user.username}}</small>
                    </li>
                    <li class="d-flex align-items-center">
                        <small>{{formatDate(photo.created)}}</small>
                    </li>
                </ul>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Gallery',
    
    props: {
        photos: Array
    },

    methods: {
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

<style scoped>
.card {
    color: black;
    text-decoration: none;
}

.card-cover {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
</style>