/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import NProgress from 'vue-nprogress'
import VueConfirmDialog from 'vue-confirm-dialog'
import Paginate from 'vuejs-paginate'
import VueSelectInputUi from 'vue-select-input-ui';
import 'vue-select-input-ui/dist/vue-select-input-ui.css';
import vuetify from '@/plugins/vuetify' // path to vuetify export

// AXOIS 
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios
const axios = require('axios');
axios.defaults.baseURL = 'https://plan2-api.herokuapp.com/';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.config.productionTip = false
Vue.use(NProgress)
Vue.use(ArgonDashboard)
Vue.use(VueConfirmDialog)
Vue.use(Paginate) 

// MODAL POPUP MSG 
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

// PAGINATION 
Vue.component('paginate', Paginate)

// SELECT INPUT 
Vue.component('VueSelectInputUi', VueSelectInputUi);

const nprogress = new NProgress({ parent: '.nprogress-container' })

new Vue({
  router,
  nprogress,
  vuetify,
  render: h => h(App)
}).$mount('#app')
