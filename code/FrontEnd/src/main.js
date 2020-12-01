import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue,BootstrapVueIcons } from 'bootstrap-vue'
import Vuex from 'vuex'
import router from './router'

import './assets/css/icofont.min.css'
import './assets/css/style.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
// Vue.use(Crunker);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.config.ignoredElements = ['speak','say-as']

var vueapp = new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
