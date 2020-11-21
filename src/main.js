import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueChatScroll from 'vue-chat-scroll'
import vuetify from './plugins/vuetify'

Vue.use(VueChatScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
