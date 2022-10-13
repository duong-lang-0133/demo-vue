<template>
    <div class="card">
        <div class="card-body">
            <div class="row">

                <div class="col-md-12">
                    <form @submit.prevent="StoreForm()" action="/news" method="POST">
                        <div class="form-group">
                            <label for="basicInput">Topic</label>
                            <input type="text" class="form-control " id="basicInput" placeholder="Topic"
                                v-model="form.topic" v-bind:class="{ 'is-invalid': erorr.topic }">
                            <div v-if="erorr.topic" class="invalid-feedback">
                                {{ erorr.topic[0]  }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="helpInputTop">Name</label>
                            <input type="text" class="form-control" id="helpInputTop" placeholder="Name"
                                v-model="form.name" v-bind:class="{ 'is-invalid': erorr.name }">
                            <div v-if="erorr.name" class="invalid-feedback">
                                {{ erorr.name[0]  }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="helpInputTop">Content</label>
                            <input type="text" class="form-control" id="helpInputTop" placeholder="Content"
                                v-model="form.content" v-bind:class="{ 'is-invalid': erorr.content }">
                            <div v-if="erorr.content" class="invalid-feedback">
                                {{ erorr.content[0]  }}
                            </div>
                        </div>
                        <router-link to="/news" class="btn btn-danger">Cancel</router-link>
                        <button type="submit" class="btn btn-success">Submit</button>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props : ['id'],
        data() {
            return {
                form: {
                    name: ' ',
                    topic: ' ',
                    content: ' ',
                },
                option: [],
                erorr: [],
                data: {}
            }
        },
        methods: {
            getData() {
                axios.get('/api/news/' + this.id + '/edit').then((response) => {
                    this.form = { // add data to v-model="form.*" 
                        name: response.data.name,
                        content: response.data.content,
                        topic: response.data.topic,
                    }
                });
            },
            StoreForm() {
                // console.log(this.form)
                axios.put('/api/news/' + this.id, this.form).then((response) => {
                    if (response.data.status) {
                        // console.log(response.data.messege);
                        this.$noty.success(response.data.messege);
                        this.$router.push({
                            name: 'news',
                        });
                    }
                }).catch((erorr) => {
                    // console.log(erorr.response.data.errors);
                    this.erorr = erorr.response.data.errors
                })
            }
        },
        mounted() {
            this.getData();
        },
    }

</script>
