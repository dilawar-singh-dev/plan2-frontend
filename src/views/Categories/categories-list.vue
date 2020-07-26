<template>
    <div class="container-fluid my-4">
        <div class="row">
            <div class="col-12">
                <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                    Categories
                                </h3>
                            </div>
                            <div class="col text-right">
                                <router-link :to="{ name: 'create-category'}">
                                    <base-button type="primary" size="sm">Create</base-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <base-table class="table align-items-center table-flush"
                            :class="type === 'dark' ? 'table-dark': ''"
                            :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list"
                            :data="categories">
                            <template slot="columns">
                                <th>Name</th>
                                <th>Remark</th>
                                <th>Status</th>
                                <th>Action</th>
                            </template>

                            <template slot-scope="{row}">
                                <td class="budget">
                                    {{row.name}}
                                </td>
                                <td class="budget">
                                    {{row.remark}}
                                </td>
                                <td class="budget">
                                    <toggle-button @change="statusChange(row.id,row.disable)" :value="row.disable" :labels="{
                                         checked: 'Disable',
                                         unchecked: 'Enable'
                                        }" :width="70" :switch-color="{
                                         checked: 'rgba(147, 231, 195, 0.8)',
                                          unchecked: 'rgba(254, 201, 189, 0.8)'
                                        }" :color="{
                                         checked: '#ff3709',
                                         unchecked: '#1aae6f'
                                        }" />
                                </td>

                                <td class="text-left">
                                    <i class="fa fa-trash text-danger ml-3"></i>
                                </td>

                            </template>

                        </base-table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    const axios = require('axios');
    export default {
        name: 'projects-table',
        props: {
            type: {
                type: String
            },
            title: String
        },
        data() {
            return {
                categories: []
            }
        },
        methods: {
            getCategories() {
                
                this.$nprogress.start();
                this.$nprogress.inc(0.3);
                var token = localStorage.getItem('authToken');
                axios.get('category/show', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(
                        response => {
                            this.categories = response.data.data;
                            this.$nprogress.done();
                        })
                    .catch(e => {
                        // MODAL BOX
                        this.$confirm({
                            message: e.response.data.statusMessage,
                            button: {
                                no: 'Close',
                                // yes: 'Yes'
                            },
                            /**
                             * Callback Function
                             * @param {Boolean} confirm 
                             */
                            callback: confirm => {
                                if (confirm) {
                                    // ... do something
                                }
                            }

                        })
                        // MODAL BOX 
                        this.$nprogress.done();
                    });
            },
             statusChange(id,value) {

                var done = true;
                if(value == true){
                  done = false;
                }
                this.$nprogress.start();
                this.$nprogress.inc(0.3);

                let formData = new FormData();
                formData.append('done', done);

                var token = localStorage.getItem('authToken');
                axios.put('task/update/' + id, formData, {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(
                        response => {
                            this.$nprogress.done();
                        })
                    .catch(e => {
                        // MODAL BOX
                        this.$confirm({
                            message: e.response.data.message,
                            button: {
                                no: 'Close',
                                // yes: 'Yes'
                            },
                            /**
                             * Callback Function
                             * @param {Boolean} confirm 
                             */
                            callback: confirm => {
                                if (confirm) {
                                    // ... do something
                                }
                            }
                        })
                        // MODAL BOX 
                        this.$nprogress.done();
                        this.isLoading = false
                    });
            }
        },
        mounted() {
            // Fetch initial results
            this.getCategories();
        }
    }
</script>
<style lang="css">
    .page-item a {
        position: relative;
        display: block;
        padding: .5rem .75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #8898aa;
        background-color: #fff;
        border: 1px solid #dee2e6;
    }

    .page-item a,
    .page-item span {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 0;
        margin: 0 3px;
        border-radius: 50% !important;
        width: 36px;
        height: 36px;
        font-size: .875rem;
    }

    .page-item.active a {
        -webkit-box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    }

    .page-item.active a {
        z-index: 1;
        color: #fff;
        background-color: #5e72e4;
        border-color: #5e72e4;
    }
</style>