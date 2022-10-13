<template>
    <div class="card">
        <div class="card-body">
            <!-- button atas -->
            <template>
                <v-toolbar flat>
                    <v-toolbar-title>Data New</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.prevent="newsRoute()" dark class="mb-2">
                        Create New
                    </v-btn>
                </v-toolbar>
            </template>
            <!-- end button atas -->
            <!-- header -->
            <v-card-title>
                <v-spacer></v-spacer>
                <!-- search engine -->
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <!-- end header -->
            <!-- table -->
            <!-- :header untuk header , : items untuk data , :search untuk search dan perpage untuk pagination -->
            <v-data-table :headers="headers" :items="data" :search="search" :items-per-page="10" class="elevation-2">
                <!--  action icon di json nya -->
                <template v-slot:item.action="{ item }">
                    <!-- icon menggunaka  v icon -->
                    <v-icon @click="editItem(item)">Edit</v-icon>
                    <v-icon color="error" @click="deleteItem(item)">Delete</v-icon>
                </template>
                <!-- end -->
            </v-data-table>
        </div>

    </div>

</template>


<script>
    export default {
        data() {
            return {
                headers: [{
                        text: 'topic', // nama header
                        value: 'topic' //  value dari database
                    },
                    {
                        text: 'name',
                        value: 'name'
                    },
                    {
                        text: 'content',
                        value: 'content'
                    },
                    {
                        text: 'Actions',
                        value: 'action', // action dari v-slot:item.action
                        sortable: false,
                        align: 'center'
                    },
                ],
                data: [], // isi data yang ada du databse
                search: '',
                modelDelete: false
            }
        },
        methods: {
            GetData() {
                axios.get('/api/news').then((response) => {
                    this.data = response.data
                }).catch((eror) => {
                    console.log(eror);
                })
            },
            newsRoute() {
                this.$router.push('/news/create')
            },
            deleteItem(item) {
                Swal.fire({
                    title: 'Deleted?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('/api/news/' + item.id).then((response) => {
                            console.log('delete news');
                            // delete tanpa reload
                            const idx = this.data.indexOf(item)
                            this.data.splice(idx, 1)
                            // alert
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
                this.$router.push('/news/' + item.id);
            }
        },

        mounted() {
            this.GetData()
        },
    }

</script>
