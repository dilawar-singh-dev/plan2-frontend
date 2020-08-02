<template>
    <div class="container-fluid my-4">
        <div class="row">
            <div class="col-12">
                <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                            <div class="col-lg-8 d-flex justify-content-between">
                                <h3 class="mb-0 d-flex align-items-center" :class="type === 'dark' ? 'text-white': ''">
                                    Friends
                                </h3>
                            </div>
                            <div class="col-lg-4 text-md-right d-flex justify-content-md-end">
                                <router-link :to="{ name: 'add-friend'}">
                                    <base-button type="primary" class="ml-auto" size="sm">Add</base-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <base-table class="table align-items-center table-flush"
                            :class="type === 'dark' ? 'table-dark': ''"
                            :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list"
                            :data="users">
                            <template slot="columns">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </template>

                            <template slot-scope="{row}">
                                <td class="budget">
                                    {{row.name}}
                                </td>
                                <td class="budget">
                                    {{row.email}}
                                </td>
                                <td class="budget">
                                    Status
                                </td>
                                <td class="text-left">
                                    <base-button type="danger" class="text-white mr-auto mr-md-0" @click="userAction()"
                                        size="sm">
                                        Remove</base-button>
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
                users: []
            }
        },
        methods: {
            getUsers() {
                this.$nprogress.start();
                this.$nprogress.inc(0.3);
                var token = localStorage.getItem('authToken');
                axios.get('users/search', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(
                        response => {
                            this.users = response.data.rows;
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
            userAction() {
                console.log('Remove Friend');
            }
        },
        mounted() {
            // Fetch initial results
            this.getUsers();
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

    .form-group {
        width: 100%;
    }

    .vdpComponent {
        width: 100%
    }

    .vdpComponent input,
    .maz-input__input {
        display: block !important;
        width: 100% !important;
        height: calc(1.5em + 1.25rem + 2px) !important;
        padding: 0.625rem 0.75rem !important;
        font-size: 0.875rem !important;
        font-weight: 400 !important;
        line-height: 1.5 !important;
        color: #8898aa !important;
        background-color: #fff !important;
        background-clip: padding-box !important;
        border: 1px solid #cad1d7 !important;
        border-radius: 0.375rem !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
        transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
        font-size: 0.875rem !important;
        -webkit-box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02) !important;
        box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02) !important;
        border: 0 !important;
        -webkit-transition: -webkit-box-shadow .15s ease !important;
        transition: -webkit-box-shadow .15s ease !important;
        transition: box-shadow .15s ease !important;
        transition: box-shadow .15s ease, -webkit-box-shadow .15s ease !important;
    }

    .maz-input__label {
        display: none;
    }

    .maz-select__toggle {
        position: absolute;
        bottom: 10px;
        right: 0px;
        display: flex;
    }

    .v-text-field__details {
        display: none
    }

    .task-group-row,
    .tasks-list-row {
        border: 0 !important;
        -webkit-transition: -webkit-box-shadow .15s ease !important;
        transition: -webkit-box-shadow .15s ease !important;
        transition: box-shadow .15s ease !important;
        transition: box-shadow .15s ease, -webkit-box-shadow .15s ease !important;
    }

    .task-group-row {
        box-shadow: 0 1px 3px rgba(45, 206, 136, 0.767), 0 1px 0 rgba(0, 0, 0, 0.02) !important;
    }

    .tasks-list-row {
        box-shadow: 0 1px 3px rgba(251, 98, 64, 0.829), 0 1px 0 rgba(0, 0, 0, 0.02) !important;
    }

    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot {
        box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02) !important;
    }

    .plus-btn {
        width: 50px;
        height: 50px;
        line-height: 20px;
        font-size: 20px;
        font-weight: 300;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .z-index-9999 {
        z-index: 9999;
    }

    .vs-switch,
    .vs-switch:hover {
        background: #f5365c;
        color: #fff;
    }

    .vs-switch__text.off {
        color: #fff;
    }
</style>