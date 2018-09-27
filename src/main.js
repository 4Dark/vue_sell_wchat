// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import router from './router'
// Vue.config.productionTip = false
import goods from './components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import VueResource from 'vue-resource'
// import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)
const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller},
  {path: '*', redirect: '/goods'}
]
const router = new VueRouter({
  mode: 'history',
  routes,  // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  router,
  // reader: h => h(App)
  template: '<App/>'
})
