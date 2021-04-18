<template>
    <div class="comments">
        <div v-if="this.$root.$data.user">
            <form>
                <legend>Comment</legend>
                <div class="mb-3">
                    <textarea class="form-control" placeholder="Comment" v-model="comment"></textarea>
                </div>
                <button class="btn btn-primary" @click.prevent="submitComment()">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Comments',

    data() {
        return {
            comment: ''
        }
    },

    methods: {
        async submitComment() {
            try{
                await axios.post(`/api/comments/${this.$route.params.id}`, {
                    comment: this.comment,
                    photo: this.$route.params.id,
                    user: this.$root.$data.user
                });
                this.comment = '';
                this.getAllComments();
            } catch (error) {  console.log(error);  }
        },

        async getAllComments() {
            try {
                let response = await axios.get(`/api/comments/${this.$route.params.id}`);
                this.comments = response.data;
            } catch (error) {  console.log(error);  }
        }
    }
}
</script>