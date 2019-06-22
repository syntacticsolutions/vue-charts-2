import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import '../vue-charts-framework/src/assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')

Vue.prototype.$axios = axios
