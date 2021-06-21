import Vue from 'vue';
import { PrismEditor } from 'vue-prism-editor';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles

Vue.config.productionTip = false;
Vue.component('PrismEditor', PrismEditor);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
