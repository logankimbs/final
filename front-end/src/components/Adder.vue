<template>
    <transition v-if="show" name="modal">
        <div class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Upload Photo</h5>
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
                        <button type="button" class="btn btn-secondary" @click="close">Close</button>
                        <button type="button" class="btn btn-primary" @click.prevent="upload()">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Adder',

    props: {
        show: Boolean
    },

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
        async upload() {
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name);
                formData.append('title', this.title);
                formData.append('description', this.description);
                await axios.post("/api/photos", formData);
                this.file = null;
                this.url = "";
                this.title = "";
                this.description = "";
                this.$emit('uploadFinished');
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
        },

        fileChanged(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },

        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    transition: opacity 0.5s ease;
    display: flex;
    transition: background 0.2s ease-in-out, height 1s ease-in-out;
    transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
    justify-content: center;
    transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
    width: 50%;
    height: max-content;
    margin-top: 80px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all 0.5s ease;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

/* modal for small screens */
@media only screen and (max-width: 767px) and (min-width: 300px) {
    .modal-container {
        width: 90%;
    }
}
</style>