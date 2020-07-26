
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
                     <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        @submit.prevent="validate()"
                    >
                         <v-text-field
                            v-model="model.name"
                            :counter="20"
                            :rules="nameRules"
                            label="Name"
                            prepend-inner-icon="ni ni-hat-3"
                            required
                            aria-autocomplete="off"
                            autocomplete="off"
                            solo
                        ></v-text-field>

                         <v-text-field
                            class="mb-0"
                            v-model="model.email"
                            :rules="emailRules"
                            label="E-mail"
                            prepend-inner-icon="ni ni-email-83"
                            aria-autocomplete="off"
                            autocomplete="off"
                            solo
                        ></v-text-field>

                        <v-text-field
                            class="mb-0"
                            v-model="model.password"
                            :value="model.password"
                            :rules="passwordRules"
                            @click:append="() => (value = !value)"
                            @input="_=>model.password=_"
                            :type="value ? 'password' : 'text'"
                            prepend-inner-icon="ni ni-lock-circle-open"
                            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                            label="Password"
                            solo
                        ></v-text-field>

                        <div class="text-center">
                            <vue-button-spinner
                                :is-loading="isLoading" 
                                :disabled="!valid"
                                :status="status"
                                class="btn my-4 btn-primary px-4 py-2 h-auto"
                                type="submit"
                                >
                                <span>Create account</span>
                            </vue-button-spinner>
                        </div>
                  </v-form>
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
                 valid: true,
                model: {
                    name: '',
                    email: '',
                    password: ''
                },
                value: true,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 
                    'Min. 8 characters with at least one capital letter, a number and a special character.',
                ],
                isLoading: false,
				status: '',
            }
        },
        components: {
            VueButtonSpinner
        },
        methods: {
             validate () {
                this.$refs.form.validate();
                if(this.$refs.form.validate()){
                    this.register();
                }
            },
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