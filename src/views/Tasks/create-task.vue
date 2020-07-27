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
                                    <base-button type="primary" size="sm">View</base-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-0" />

                    <div class="col-xl-12">
                         <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        @submit.prevent="validate()"
                    >

                            <div class="">
                                <div class="row">
                                    <div class="col-lg-12 mb-3">
                                        <label class="form-control-label">Select Date</label>
                                        <date-pick 
                                        :format="format"
                                        :parseDate="parseDate"
                                        :formatDate="formatDate"
                                        :selectableYearRange="{from: 2020, to: 2021}"
                                        :inputAttributes="{readonly: true}"
                                        v-model="data.date"
                                        ></date-pick>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div class="row">
                                    <div class="col-md-12">

                                        <div class="task-group-row mb-3 p-3" v-for="(taskse,tasksKey) in data.tasks"
                                            :key="tasksKey">
                                            <div class="d-flex align-items-end justify-content-end ml-auto text-right position-absolute right-0 pr-5 z-index-9999">
                                                        <i class="fas fa-minus-circle cursor-pointer"
                                                            @click="removetasksRow(tasksKey)"
                                                            v-show="tasksKey || ( !tasksKey && data.tasks.length > 1)"></i>
                                                    </div>
                                            <div class="row">
                                                <div class="col-12 d-flex pb-0 align-items-center">
                                                <label class="form-control-label">Category</label>
                                                <div class="col text-right">
                                                   <base-button type="default" size="sm" class="btn text-white mb-3" @click="modals.createCategory = true">
                                                        Add new category
                                                    </base-button>
                                                </div>
                                                </div>
                                                <div class="col-md-12 d-flex flex-row">
                                                     <v-select
                                                        :items="categories"
                                                        label="Select Category"
                                                        item-text='name'
                                                        item-value='id'
                                                        v-model="taskse.category"
                                                        :rules="[(v) => !!v || 'Category is required']"
                                                         required
                                                         solo
                                                        ></v-select>
                                                </div>

                                                <div v-if="categories.length > 0" class="row w-100">
                                                    <div class="col-12 col-md-11 offset-md-1 p-4 pt-0">
                                                        <h6 class="col-12 heading-small text-muted mb-0 py-0">Task</h6>
                                                        <div class="tasks-list-row p-3 m-3 position-relative" v-for="(liste,listKey) in taskse.list"
                                                            :key="listKey">

                                                                <div class="d-flex align-items-end justify-content-end ml-2 position-absolute right-0 pr-4 z-index-9999">
                                                                        <i class="fas fa-minus-circle cursor-pointer"
                                                                            @click="removetasksListRow(tasksKey,listKey)"
                                                                            v-show="listKey || ( !listKey && taskse.list.length > 1)"></i>
                                                                    </div>

                                                            <div class="row mx-0">
                                                                <div class="col-md-12 d-flex mb-0 pb-0">
                                                                     <v-text-field
                                                                        v-model="liste.name"
                                                                        :counter="40"
                                                                        :rules="taskNameRules"
                                                                        label="Name"
                                                                        required
                                                                        class="mb-0 mt-0"
                                                                        aria-autocomplete="off"
                                                                        autocomplete="off"
                                                                        solo
                                                                    ></v-text-field>
                                                                </div>
                                                                <div class="col-md-12 d-flex mt-0 py-0">
                                                                     <v-text-field
                                                                        v-model="liste.remark"
                                                                        :counter="20"
                                                                        :rules="nameRules"
                                                                        label="Remark"
                                                                        required
                                                                        class="mb-0 mt-0"
                                                                        aria-autocomplete="off"
                                                                        autocomplete="off"
                                                                        solo
                                                                    ></v-text-field>
                                                                </div>
                                                                <div class="col-md-12 mt-0 pt-0 pb-0">

                                                                <label class="form-control-label">Priority</label>

                                                                </div>

                                                                <div class="col-md-12 mt-0 pt-0">

                                                                 <toggle-button v-model="liste.priority" :value="false" :labels="{
                                                                        checked: 'High',
                                                                        unchecked: 'Low',
                                                                        }" :width="70" :switch-color="{
                                                                        checked: 'rgba(147, 231, 195, 0.8)',
                                                                        unchecked: 'rgba(254, 201, 189, 0.8)'
                                                                        }" :color="{
                                                                        checked: '#ff3709',
                                                                        unchecked: '#1aae6f'
                                                                    }" />
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="col-12 d-flex align-items-center mt-2 mb-3">
                                                            <base-button class="text-white rounded-circle plus-btn" type="warning" size="sm"
                                                                @click="addtasksListRow(tasksKey)">+
                                                            </base-button>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div v-else>
                                                     <div class="col-12 py-0">
                                                        <p style="font-size:14px">Category not found!</p>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- CUISNE END  -->

                                         <div class="d-flex align-items-center mt-2">
                                            <base-button  class="text-white rounded-circle plus-btn" type="success" size="sm" @click="addtasksRow">+
                                            </base-button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="text-left">
                                <vue-button-spinner :is-loading="isLoading" :disabled="!valid" :status="status"
                                    class="btn my-4 btn-primary px-4 py-2 h-auto" type="submit">
                                    <span>Create Task</span>
                                </vue-button-spinner>
                            </div>
                      </v-form>
                    </div>

                </div>
            </div>
        </div>


         <modal :show.sync="modals.createCategory"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                      <v-form
                        ref="form2"
                        v-model="validModal"
                        lazy-validation
                        @submit.prevent="validateCreateCategory()"
                    >

                     <v-text-field
                        v-model="category.name"
                        :counter="20"
                        :rules="nameRules"
                        label="Name"
                        required
                        class="mb-0 mt-0"
                        aria-autocomplete="off"
                        autocomplete="off"
                        solo
                    ></v-text-field>

                     <v-text-field
                        v-model="category.remark"
                        :counter="20"
                        :rules="nameRules"
                        label="Remark"
                        required
                        class="mb-0 mt-0"
                        aria-autocomplete="off"
                        autocomplete="off"
                        solo
                    ></v-text-field>

                    <div class="text-center">
                            <vue-button-spinner :is-loading="isLoading" :disabled="!validModal" :status="status"
                                class="btn my-4 btn-primary px-2 py-1 h-auto btn-sm" type="submit">
                                <span>Create Category</span>
                            </vue-button-spinner>
                    </div>
                    </v-form>
                </template>
            </card>
        </modal>


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
                format: 'dddd MMMM Do, YYYY',
                data: {
                    date: fecha.format(new Date(), 'dddd MMMM Do, YYYY'),
                    tasks: [{
                        category: null,
                        list: [{
                            name: '',
                            remark: '',
                            priority: true
                        }]
                    }]
                },
                categories: [],
                modals: {
                    createCategory: false
                },
                category: {
                    name: '',
                    remark: ''
                },
                valid: true,
                value: true,
                validModal: true,
                valueModal: true,
                nameRules: [
                    v => !!v || 'Value is required',
                    v => (v && v.length <= 20) || 'Value must be less than 20 characters',
                ],
                taskNameRules: [
                    v => !!v || 'Value is required',
                    v => (v && v.length <= 40) || 'Value must be less than 40 characters',
                ],
                categoryRules:[
                    v => !!v || 'Category is required'
                ],
            }
        },
        methods: {
            validate () {
                this.$refs.form.validate();
                if(this.$refs.form.validate()){
                    this.createTask();
                }
            },
            validateCreateCategory(){
                 this.$refs.form2.validate();
                if(this.$refs.form2.validate()){
                    this.createCategory();
                }
            },
            parseDate(dateString, format) {
            return fecha.parse(dateString, format);
            },
            formatDate(dateObj, format) {
                return fecha.format(dateObj, format);
            },

            statusChange(id,value,input) {
                var done = true;
                if(value == true){
                  var done = false;
                }
            },
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
                            this.categories = response.data.data;
                            console.log(response.data.data)
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
            addtasksRow() {
                this.data.tasks.push({
                    category: '',
                        list: [{
                            name: '',
                            remark: '',
                            priority: ''
                    }]
                })
            },
            addtasksListRow(tasksKey) {
                this.data.tasks[tasksKey].list.push({
                    name: '',
                    remark: '',
                    priority: ''
                })
            },
            removetasksRow(tasksKey) {
                this.data.tasks.splice(tasksKey, 1);
            },
            removetasksListRow(tasksKey, listKey) {
                this.data.tasks[tasksKey].list.splice(listKey, 1);
            },
            createTask() {

                this.$nprogress.start();
                this.$nprogress.inc(0.3);

                // BTN  
                this.isLoading = true;
                var token = localStorage.getItem('authToken');
                axios.post('/task/store', this.data,{
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        // MODAL BOX
                        this.$confirm({
                            message: 'Task successfully created',
                            button: {
                                no: 'Close',
                                yes: 'View Tasks'
                            },
                            /**
                             * Callback Function
                             * @param {Boolean} confirm 
                             */
                            callback: confirm => {
                                if (confirm) {
                                    this.$router.push({
                                        name: 'tasks'
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
            },
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
                        this.isLoading = false;
                        this.modals.createCategory = false;
                        this.categories.unshift(response.data);
                    })
                    .catch(e => {
                        // MODAL BOX
                        this.$confirm({
                            message: e.response.data.error.message,
                            button: {
                                no: 'Close',
                            }
                        })
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