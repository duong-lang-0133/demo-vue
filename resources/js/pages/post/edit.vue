<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="StoreForm()" action="/posts" method="POST">
                        <div class="form-group">
                            <label for="basicInput">Content</label>
                            <input type="text" class="form-control " id="basicInput" placeholder="content"
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
                            <label for="helperText">news</label>
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
        props : ['id'],
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
            getData() {
                axios.get('/api/posts/' + this.id + '/edit').then((response) => {
                    this.form = { // add data to v-model="form.*" 
                        title: response.data.title,
                        content: response.data.content,
                        new_id: response.data.new_id,
                    }
                });
            },
            
            StoreForm() {
                // console.log(this.form.new_id);
                axios.put('/api/posts/'+ this.id, this.form).then((response) => {
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
            this.getValueOption(),
            this.getData()
        },
    }

</script>
