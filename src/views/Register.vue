
<template>
    <div class="row justify-content-center position-relative">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5 position-relative">

                    <!-- RESPONSE BOX -->
                    <div id="response-box"
                        class="col-8 px-0 py-2 rounded mx-auto position-absolute top--30px left-0 right-0 d-none shadow">
                        <h3 class="text-white text-center"></h3>
                    </div>

                    <div class="text-center text-muted mb-4">
                        <h4>Register</h4>
                    </div>
                    <form role="form" @submit.prevent="register()">

                         <base-input class="input-group-alternative mb-3"
                                    placeholder="Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <div class="text-center">
                            <vue-button-spinner
                                :is-loading="isLoading" 
                                :disabled="isLoading"
                                :status="status"
                                class="btn my-4 btn-primary px-4 py-2 h-auto"
                                type="submit"
                                >
                                <span>Create account</span>
                            </vue-button-spinner>
                        </div>
                    </form>
                </div>
            </div>
             <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VueButtonSpinner from 'vue-button-spinner';
    export default {
        name: 'login',
        data() {
            return {
                model: {
                    name: '',
                    email: '',
                    password: ''
                },
                isLoading: false,
				status: '',
            }
        },
        components: {
            VueButtonSpinner
        },
        methods: {
            register() {

                this.$nprogress.start();
                // BTN  
                this.isLoading = true;

                axios.post('register', this.model)
                    .then(response => {

                        localStorage.setItem('authToken', response.data.token);

                        this.$router.push({
                            name: 'tasks'
                        });
                        
                        this.$nprogress.done();
                        this.isLoading = false
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
        }
    }
</script>
<style>
</style>