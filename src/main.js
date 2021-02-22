import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App.vue'
import $ from "jquery"
import VueRouter from "vue-router"
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

const route=

new Vue({
  render: h => h(App),
}).$mount('#app')
