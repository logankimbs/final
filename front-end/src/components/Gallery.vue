<template>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="photo in photos" :key="photo._id">
            <div class="card">
                <img :src="photo.path" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title mb-0">{{photo.title}}</h5>
                </div>
            </div>
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