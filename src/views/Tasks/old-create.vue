<template>
    <div class="container-fluid my-4">
        <div class="row">
            <div class="col-12">
                <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                    Create Task
                                </h3>
                            </div>
                            <div class="col text-right">
                                <router-link :to="{ name: 'tasks'}">
                                    <base-button type="primary" size="sm">View Tasks</base-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-0" />

                    <div class="col-xl-12">
                        <form @submit.prevent="createVendor()">
                            <div class="">
                                <div class="row">
                                    <div class="col-lg-8 mb-3">
                                        <label class="form-control-label">Select Date</label>
                                        <date-pick :displayFormat="'DD-MM-YYYY'" 
                                        :selectableYearRange="{from: 2000, to: 2021}"
                                        :inputAttributes="{readonly: true}"
                                        v-model="date"></date-pick>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div class="row">
                                    <div class="col-md-8">

                                        <div class="cuisne-row mb-3" v-for="(menue,menuKey) in data.menu"
                                            :key="menuKey">
                                            <div class="row">
                                                <div class="col-12">
                                                <label class="form-control-label">Category</label>
                                                </div>
                                                <div class="col-md-12 d-flex mb-3 flex-column">
                                                <VueSelectInputUi class="w-100" v-model="data.rating" label="Select"
                                                    :options="[
                                                    { label: '1', value: '1' },
                                                    { label: '2', value: '2' },
                                                    { label: '3', value: '3' },
                                                    { label: '4', value: '4' },
                                                    { label: '5', value: '5' }
                                                    ]" 
                                                />
                                                    
                                                    <div class="d-flex align-items-center ml-2">
                                                        <i class="fas fa-minus-circle cursor-pointer"
                                                            @click="removeMenuRow(menuKey)"
                                                            v-show="menuKey || ( !menuKey && data.menu.length > 1)"></i>
                                                    </div>
                                                </div>
                                                <div class="row w-100">
                                                    <div class="col-12 mx-3">
                                                        <h6 class="col-12 heading-small text-muted mb-2">Task</h6>
                                                        <div class="menu-list-row" v-for="(liste,listKey) in menue.list"
                                                            :key="listKey">
                                                            <div class="row mx-0">
                                                                <div class="col-md-12 d-flex">
                                                                    <base-input alternative="" label="Name"
                                                                        placeholder="Name"
                                                                        input-classes="form-control-alternative"
                                                                        v-model="liste.name" />
                                                                </div>
                                                                <div class="col-md-6 d-flex">
                                                                    <base-input alternative="" label="Remark"
                                                                        placeholder="Remark"
                                                                        input-classes="form-control-alternative"
                                                                        v-model="liste.price" />
                                                                    <div class="d-flex align-items-center ml-2">
                                                                        <i class="fas fa-minus-circle cursor-pointer"
                                                                            @click="removeMenuListRow(menuKey,listKey)"
                                                                            v-show="listKey || ( !listKey && menue.list.length > 1)"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 d-flex">
                                                                    <base-input alternative="" label="Color"
                                                                        placeholder="Color"
                                                                        input-classes="form-control-alternative"
                                                                        v-model="liste.price" />
                                                                    <div class="d-flex align-items-center ml-2">
                                                                        <i class="fas fa-minus-circle cursor-pointer"
                                                                            @click="removeMenuListRow(menuKey,listKey)"
                                                                            v-show="listKey || ( !listKey && menue.list.length > 1)"></i>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="col-12 d-flex align-items-center mt-2 mb-3">
                                                            <base-button type="warning" size="sm"
                                                                @click="addMenuListRow(menuKey)">Add More List
                                                            </base-button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr class="mt-0" />
                                        </div>
                                        <!-- CUISNE END  -->

                                         <div class="d-flex align-items-center mt-2">
                                            <base-button type="success" size="sm" @click="addMenuRow">Add More Task
                                            </base-button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="text-left">
                                <vue-button-spinner :is-loading="isLoading" :disabled="isLoading" :status="status"
                                    class="btn my-4 btn-primary px-4 py-2 h-auto" type="submit">
                                    <span>Create Task</span>
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
                data: {
                    name: '',
                    rating: '',
                    status: 0,
                    location: {
                        address: '',
                        coordinates: {
                            lat: '',
                            lng: ''
                        },
                        pinCode: '',
                        city: '',
                        country: ''
                    },
                    menu: [{
                        cuisne: '',
                        list: [{
                            name: '',
                            price: ''
                        }]
                    }]
                },
                inputs: [{
                    name: ''
                }],
                date: '2019-01-01'
            }
        },
        methods: {
            getCategories(){

                this.$nprogress.start();
                this.$nprogress.inc(0.3);
                var token = localStorage.getItem('authToken');
                axios.get('category/show', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(
                        response => {
                            this.tasks = response.data.rows;
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
            addMenuRow() {
                this.data.menu.push({
                    cuisne: '',
                    list: [{
                        name: '',
                        price: ''
                    }]
                })
            },
            addMenuListRow(menuKey) {
                this.data.menu[menuKey].list.push({
                    name: '',
                    price: ''
                })
            },
            add() {
                this.inputs.push({
                    name: ''
                });
            },
            removeMenuRow(menuKey) {
                this.data.menu.splice(menuKey, 1);
            },
            removeMenuListRow(menuKey, listKey) {
                this.data.menu[menuKey].list.splice(listKey, 1);
            },
            createVendor() {

                this.$nprogress.start();
                this.$nprogress.inc(0.3);

                // BTN  
                this.isLoading = true;

                // axios.post('v1/vendors', this.data)
                //     .then(response => {
                //         // MODAL BOX
                //         this.$confirm({
                //             message: 'Vendor successfully created',
                //             button: {
                //                 no: 'Close',
                //                 yes: 'View vendors'
                //             },
                //             /**
                //              * Callback Function
                //              * @param {Boolean} confirm 
                //              */
                //             callback: confirm => {
                //                 if (confirm) {
                //                     this.$router.push({
                //                         name: 'vendors'
                //                     })
                //                 }
                //             }
                //         })
                //         // MODAL BOX 
                //         this.$nprogress.done();
                //         this.isLoading = false
                //     })
                //     .catch(e => {
                //         // MODAL BOX
                //         this.$confirm({
                //             message: e.response.data.error.message,
                //             button: {
                //                 no: 'Close',
                //                 // yes: 'Yes'
                //             },
                //             /**
                //              * Callback Function
                //              * @param {Boolean} confirm 
                //              */
                //             callback: confirm => {
                //                 if (confirm) {
                //                     // ... do something
                //                 }
                //             }
                //         })
                //         // MODAL BOX 
                //         this.$nprogress.done();
                //         this.isLoading = false
                //     });
            },
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
</style>