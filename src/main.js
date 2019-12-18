import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill()

Vue.config.productionTip = false

Vue.use(Vue2TouchEvents,{
  touchClass: 'active',
  disableClick: true
})

new Vue({
  render: h => h(App),
}).$mount('#app')
