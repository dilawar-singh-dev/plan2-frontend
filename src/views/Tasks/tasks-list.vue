<template>
    <div class="container-fluid my-4">
        <div class="row">
            <div class="col-12">
                <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                            <div class="col-lg-8 d-flex justify-content-between">
                                <h3 class="mb-0 d-flex align-items-center" :class="type === 'dark' ? 'text-white': ''">
                                    Tasks 
                                </h3>
                                <div class="row">
                                    <div class="col-lg-6 mx-auto py-0 d-flex flex-column justify-content-end justify-content-md-center ">
                                    <date-pick   
                                        :format="format"
                                        :parseDate="parseDate"
                                        :formatDate="formatDate"
                                        :selectableYearRange="{from: 2020, to: 2021}"
                                        :inputAttributes="{readonly: true}"
                                        v-model="todayDate"
                                        class="ml-auto ml-md-auto mr-md-auto text-right text-md-center"
                                        >
                                        <template v-slot:default="{toggle, inputValue}">
                                            <button class="btn text-white btn-success btn-sm" @click="toggle">
                                                {{ inputValue || 'Select Date' }}
                                            </button>
                                        </template> 
                                    </date-pick>
                                    </div>
                            </div>
                            </div>
                            <div class="col-lg-4 text-md-right d-flex justify-content-md-between">
                                <base-button type="success" class="text-white mr-auto mr-md-0" @click="viewAllTasks()" size="sm">{{ viewBtnText }}</base-button>
                                <router-link :to="{ name: 'create-task'}">
                                    <base-button type="primary" class="ml-auto" size="sm">Create</base-button>
                                </router-link> 
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <base-table class="table align-items-center table-flush"
                            :class="type === 'dark' ? 'table-dark': ''"
                            :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list"
                            :data="tasks">
                            <template slot="columns">
                                <th>Name</th>
                                <th>Category</th>
                                <th>Remark</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </template>

                            <template slot-scope="{row}">
                                <td class="budget">
                                    {{row.name}}
                                </td>
                                <td class="budget">
                                    {{row.category.name}}
                                </td>
                                <td class="budget">
                                    {{row.remark}}
                                </td>
                                <td class="budget">
                                    <div v-bind:style="{ 'background-color': row.color}"
                                        :class="row.done == '1' ? 'status-active': 'status-unactive'">
                                    </div>
                                </td>
                                <td v-if="(row.date) == date" class="budget">
                                    <span class="text-warning"><b>Today</b></span>
                                </td>
                                <td v-else class="budget">
                                    {{row.date}}
                                </td>

                                <td class="budget">
                                    <!-- <toggle-button @change="statusChange(row.id,row.done)" :value="row.done" :labels="{
                                         checked: 'Done',
                                         unchecked: 'Pending'
                                        }" :width="70" :switch-color="{
                                         checked: 'rgba(147, 231, 195, 0.8)',
                                          unchecked: 'rgba(254, 201, 189, 0.8)'
                                        }" :color="{
                                         checked: '#1aae6f',
                                         unchecked: '#ff3709'
                                        }" /> -->

                                        <vs-switch  color="rgb(59,222,200)" @change="statusChange(row.id,row.done)" :value="row.done">
                                            <template color="rgb(59,222,200)" #off>
                                                Pending
                                            </template>
                                            <template color="rgba(254, 201, 189, 0.8)" #on>
                                                Done
                                            </template>
                                        </vs-switch>
                                </td>

                                <td class="text-left" @click="deleteTask(row.id)">
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
            DatePick
        },
        data() {
            return {
                format: 'dddd MMMM Do, YYYY',
                date: fecha.format(new Date(), 'dddd MMMM Do, YYYY'),
                todayDate: fecha.format(new Date(), 'dddd MMMM Do, YYYY'),
                tasks: [],
                viewBtnText: "View All Tasks"
            }
        },
        methods: {
            getTasks() {
                
                this.$nprogress.start();
                this.$nprogress.inc(0.3);
                var token = localStorage.getItem('authToken');
                console.log(this.todayDate);
                axios.get('task/show', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        },
                        params:{
                             date: this.todayDate
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
            },
            dateSelect(){
               console.log('dara');
            },
             parseDate(dateString, format) {
            return fecha.parse(dateString, format);
            console.log('dara2');
            },
            formatDate(dateObj, format) {
                return fecha.format(dateObj, format);
                console.log('dara3');
            },
            viewAllTasks(){
                if(this.todayDate == null){
                    this.todayDate = fecha.format(new Date(), 'dddd MMMM Do, YYYY');
                    this.viewBtnText = "View All Tasks";
                    this.getTasks();
                }
                else{
                 this.todayDate = null;
                 this.viewBtnText = "View Today's Tasks";
                 this.getTasks();
                }
            },
            deleteTask(id) {
                // MODAL BOX
                this.$confirm({
                    message: "Sure to delete!",
                    button: {
                        no: 'Close',
                        yes: 'Delete'
                    },
                    /**
                     * Callback Function
                     * @param {Boolean} confirm 
                     */
                    callback: confirm => {
                        if (confirm) {
                            this.$nprogress.start();
                            this.$nprogress.inc(0.3);
                            var token = localStorage.getItem('authToken');
                            axios.delete('task/delete/' + id, {
                                    headers: {
                                        Authorization: 'Bearer ' + token
                                    }
                                }).then(
                                    response => {
                                        this.getTasks();
                                        this.$nprogress.done();
                                        console.log('done')
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
                                    console.log('Not done')
                                    // MODAL BOX 
                                    this.$nprogress.done();
                                });
                        }
                    }
                })
                // MODAL BOX 
            }
        },
        mounted() {
            // Fetch initial results
            this.getTasks();
        },
         watch: {
            todayDate: function(dateGet) {
                if(dateGet) {
                    this.todayDate = dateGet;
                    this.viewBtnText = "View All Tasks";
                    this.getTasks();
                }
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
    .vs-switch,
    .vs-switch:hover{
        background: #f5365c;
        color:#fff;
    }
    .vs-switch__text.off{
        color:#fff;
    }
</style> 