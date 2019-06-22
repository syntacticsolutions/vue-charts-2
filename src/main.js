import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import '../vue-charts-framework/src/assets/scss/app.scss'

Vue.prototype.$axios = axios
Vue.prototype.$config = {
    host: 'https://us-central1-directed-galaxy-221521.cloudfunctions.net/vuecharts/'
}

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
