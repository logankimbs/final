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

<style scoped>
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>