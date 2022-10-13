<template>
    <div class="card">
        <div class="card-body">
            <div class="row">

                <div class="col-md-12">
                    <form @submit.prevent="StoreForm()" action="/posts" method="POST">
                        <div class="form-group">
                            <label for="basicInput">Content</label>
                            <input type="text" class="form-control " id="basicInput" placeholder="Content"
                                v-model="form.content" v-bind:class="{ 'is-invalid': erorr.content }">
                            <div v-if="erorr.content" class="invalid-feedback">
                                {{ erorr.content[0]  }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="helpInputTop">Title</label>
                            <input type="text" class="form-control" id="helpInputTop" placeholder="Title"
                                v-model="form.title" v-bind:class="{ 'is-invalid': erorr.title }">
                            <div v-if="erorr.title" class="invalid-feedback">
                                {{ erorr.title[0]  }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="helperText">News</label>
                            <select class="form-control" v-bind:class="{ 'is-invalid': erorr.new_id }" name="" id=""
                                v-model="form.new_id">
                                <option value="">-- News --</option>
                                <option v-for="options in option" v-bind:value="options.id">
                                    {{ options.name}}</option>
                            </select>
                            <div v-if="erorr.new_id" class="invalid-feedback">
                                {{ erorr.new_id[0]  }}
                            </div>
                        </div>
                        <router-link to="/posts" class="btn btn-danger">Cancel</router-link>
                        <button type="submit" class="btn btn-success">Submit</button>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    content: ' ',
                    title: ' ',
                    new_id: ' ',
                },
                option: [],
                erorr: [],
                data: {}
            }
        },
        methods: {
            getValueOption() {
                axios.post('/api/option/value', this.data).then((response) => {
                    this.option = response.data;
                    // console.log(this.option);
                });
            },
            StoreForm() {
                axios.post('/api/posts', this.form).then((response) => {
                    if (response.data.status) {
                        // console.log(response.data.messege);
                        this.$noty.success(response.data.messege);
                        this.$router.push({
                            name: 'posts',
                        });
                    }
                }).catch((erorr) => {
                    // console.log(erorr.response.data.errors);
                    this.erorr = erorr.response.data.errors
                })
            }
        },
        mounted() {
            this.getValueOption()
        },
    }

</script>
