<template>
    <div class="container-fluid my-4">
        <div class="row">
            <div class="col-12">
                <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                    Create Category
                                </h3>
                            </div>
                            <div class="col text-right">
                                <router-link :to="{ name: 'categories'}">
                                    <base-button type="primary" size="sm">View</base-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-0 mb-0" />

                    <div class="col-xl-12">
                       <form @submit.prevent="createCategory()">


                        <base-input alternative
                        v-model="category.name"
                        label="Name"
                         input-classes="form-control-alternative "
                                    class="col-md-6 mb-0"
                                    placeholder="Name">
                        </base-input>
                         <base-input alternative
                         label="Remark"
                         v-model="category.remark"
                          input-classes="form-control-alternative "
                                    class="col-md-6 mb-0 mt-0"
                                    placeholder="Remark">
                        </base-input>
                        <div class="col-md-12 text-left">
                             <vue-button-spinner :is-loading="isLoading" :disabled="isLoading" :status="status"
                                    class="btn btn-primary px-2 py-1 h-auto btn-sm" type="submit">
                                    <span>Create Category</span>
                             </vue-button-spinner>
                        </div>
                    </form>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>
<script>
    import VueButtonSpinner from 'vue-button-spinner';
    const axios = require('axios');
    import DatePick from 'vue-date-pick';
    import fecha from 'fecha';
    import 'vue-date-pick/dist/vueDatePick.css';
    export default {
        name: 'projects-table',
        props: {
            type: {
                type: String
            },
            title: String
        },
        components: {
            VueButtonSpinner,
            DatePick
        },
        data() {
            return {
                isLoading: false,
                status: '',
                category: {
                    name: '',
                    remark: ''
                }
            }
        },
        methods: {
            createCategory(){
                 // BTN  
                this.isLoading = true;
                var token = localStorage.getItem('authToken');
                axios.post('/category/store', this.category,{
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(response => {
                         // MODAL BOX
                        this.$confirm({
                            message: 'Category successfully created',
                            button: {
                                no: 'Close',
                                yes: 'View Categories'
                            },
                            /**
                             * Callback Function
                             * @param {Boolean} confirm 
                             */
                            callback: confirm => {
                                if (confirm) {
                                    this.$router.push({
                                        name: 'categories'
                                    })
                                }
                            }
                        })
                        // MODAL BOX 
                        this.$nprogress.done();
                        this.isLoading = false
                    })
                    .catch(e => {
                        // MODAL BOX
                        this.$confirm({
                            message: e.response.data.error.message,
                            button: {
                                no: 'Close',
                            }
                        })
                        this.$nprogress.done();
                        this.isLoading = false
                    });
            }
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

    .form-group {
        width: 100%;
    }

    .vdpComponent{
        width:100%
    }
    .vdpComponent input,
    .maz-input__input {
        display: block!important;
        width: 100%!important;
        height: calc(1.5em + 1.25rem + 2px)!important;
        padding: 0.625rem 0.75rem!important;
        font-size: 0.875rem!important;
        font-weight: 400!important;
        line-height: 1.5!important;
        color: #8898aa!important;
        background-color: #fff!important;
        background-clip: padding-box!important;
        border: 1px solid #cad1d7!important;
        border-radius: 0.375rem!important;
        -webkit-box-shadow: none!important;
        box-shadow: none!important;
        -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)!important;
        transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)!important;
        font-size: 0.875rem!important;
        -webkit-box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)!important;
        box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)!important;
        border: 0!important;
        -webkit-transition: -webkit-box-shadow .15s ease!important;
        transition: -webkit-box-shadow .15s ease!important;
        transition: box-shadow .15s ease!important;
        transition: box-shadow .15s ease, -webkit-box-shadow .15s ease!important;
    }
    .maz-input__label{
        display:none;
    }
    .maz-select__toggle{
        position: absolute;
        bottom: 10px;
        right: 0px;
        display: flex;
    }
    .v-text-field__details{
        display:none
    }
    .task-group-row,
    .tasks-list-row{
        border: 0!important;
        -webkit-transition: -webkit-box-shadow .15s ease!important;
        transition: -webkit-box-shadow .15s ease!important;
        transition: box-shadow .15s ease!important;
        transition: box-shadow .15s ease, -webkit-box-shadow .15s ease!important;
    }
    .task-group-row{
        box-shadow: 0 1px 3px rgba(45, 206, 136, 0.767), 0 1px 0 rgba(0, 0, 0, 0.02)!important;
    }
    .tasks-list-row{
        box-shadow: 0 1px 3px rgba(251, 98, 64, 0.829), 0 1px 0 rgba(0, 0, 0, 0.02)!important;
    }
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot{
        box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)!important;
    }
    .plus-btn{
        width: 50px;
        height: 50px;
        line-height: 20px;
        font-size: 20px;
        font-weight: 300;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .z-index-9999{
        z-index: 9999;
    }
</style>