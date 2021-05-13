import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import http from './common/api.js'
import utils from './common/utils.js'
import uView from "uview-ui";


Vue.use(uView);

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.prototype.$utils = utils
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
