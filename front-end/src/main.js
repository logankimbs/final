import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

let data = {  user: null  }

new Vue({
    data,
    router,
    render: h => h(App)
}).$mount('#app')