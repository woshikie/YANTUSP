import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
// import VueWorker from 'vue-worker';
import VueMeta from 'vue-meta';

Vue.config.productionTip = false;

Vue.use(require('vue-async-computed'));
// Vue.use(VueWorker);
Vue.use(VueMeta);

new Vue({
  icons: {
    iconfont: 'mdiSvg'
  },
  vuetify,
  render: h => h(App)
}).$mount('#app');
