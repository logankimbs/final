<template>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="photo in photos" :key="photo._id">
            <router-link class="card" :to="{name: 'Photo', params: {id: photo._id}}">
                <img :src="photo.path" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title mb-0">{{photo.title}}</h5>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Gallery',
    
    props: {
        photos: Array
    }
}
</script>

<style scoped>
.card {
    color: black;
    text-decoration: none;
}
</style>