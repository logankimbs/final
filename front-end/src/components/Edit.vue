<template>
    <div class="edit mb-3" v-if="show">
        <button class="btn btn-primary me-2" @click="editPhoto()">Edit</button>
        <button class="btn btn-outline-danger" @click="deletePhoto()">Delete</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Edit',

    props: {
        owner: String
    },

    data() {
        return {
            show: false,
            currentUser: this.$root.$data.user
        }
    },

    created() {
        if (this.owner === this.currentUser._id) {
            this.show = true;
        }
    },

    methods: {
        editPhoto() {

        },

        async deletePhoto() {
            try {
                await axios.delete(`/api/photos/${this.$route.params.id}`);
            } catch (error) {  console.log(error);  }
        }
    }
}
</script>