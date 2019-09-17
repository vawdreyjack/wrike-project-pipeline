import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false

new Vue({
  components: {App},
  render: h => h(App)
 }).$mount('#app');