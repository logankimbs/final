<template>
    <div>
        <button class="btn btn-link btn-floating" title="Add" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Photo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="Title" v-model="title">
                            </div>
                            <div class="mb-3">
                                <textarea type="text" class="form-control" placeholder="Description" v-model="description"></textarea>
                            </div>
                            <div>
                                <input type="file" class="form-control" ref="fileInput" @input="fileChanged">
                            </div>
                            <div class="alert alert-danger mt-3 mb-0 text-start" role="alert" v-if="error">{{this.error}}</div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click.prevent="close()">Close</button>
                            <button type="button" class="btn btn-primary" @click.prevent="upload()">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap/js/dist/modal';

export default {
    name: 'Add',
    data() {
        return {
            title: '',
            description: '',
            url: '',
            file: null,
            error: ''
        }
    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },

        close() {
            this.title = '';
            this.description = '';
            this.url = '';
            this.file = null
            this.error = '';
        },

        async upload() {
            this.error = '';
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name);
                formData.append('title', this.title);
                formData.append('description', this.description);
                await axios.post("/api/photos", formData);
                this.title = '';
                this.description = '';
                this.url = '';
                this.file = null;
                this.error = '';
            } catch (error) {
                this.error = 'Error';
            }
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

/* small screens */
@media only screen and (max-width: 767px) and (min-width: 320px) {
    .btn-floating {
        bottom: .5rem;
        right: .5rem;
    }
}
</style>