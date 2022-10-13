<template>
    <div class="card">
        <div class="card-body">
            <!-- button atas -->
            <template>
                <v-toolbar flat>
                    <v-toolbar-title>Data Post</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.prevent="postsRoute()" dark class="mb-2">
                        Create Post
                    </v-btn>
                </v-toolbar>
            </template>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="data" :search="search" :items-per-page="10" class="elevation-2">
                <template v-slot:item.action="{ item }">
                    <v-icon @click="editItem(item)">Edit</v-icon>
                    <v-icon color="error" @click="deleteItem(item)">Delete</v-icon>
                </template>
            </v-data-table>
        </div>

    </div>

</template>


<script>
    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'new_id',
                        value: 'new_id'
                    },
                    {
                        text: 'content',
                        value: 'content'
                    },
                    {
                        text: 'title',
                        value: 'title'
                    },
                    {
                        text: 'name',
                        value: 'news.name'
                    },
                    {
                        text: 'Actions',
                        value: 'action',
                        sortable: false,
                        align: 'center'
                    },
                ],
                data: [],
                search: '',
                modelDelete: false
            }
        },
        methods: {
            GetData() {
                axios.get('/api/posts').then((response) => {
                    this.data = response.data
                    // console.log(response.data); // data
                }).catch((eror) => {
                    console.log(eror);
                })
            },
            postsRoute() {
                this.$router.push('/posts/create')
            },
            deleteItem(item) {
                // console.log(item.id);
                Swal.fire({
                    title: 'Deleted ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('/api/posts/' + item.id).then((response) => {
                            const idx = this.data.indexOf(item)
                            this.data.splice(idx, 1)

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })

                    }
                })

            },
            editItem(item) {
                this.$router.push('/posts/' + item.id);
            }
        },

        mounted() {
            // this.Table(),
            this.GetData()
        },
    }

</script>
