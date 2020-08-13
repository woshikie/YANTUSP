import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import VueWorker from 'vue-worker';

Vue.config.productionTip = false;

Vue.use(require('vue-async-computed'));
Vue.use(VueWorker);

new Vue({
  icons: {
    iconfont: 'mdiSvg'
  },
  vuetify,
  render: h => h(App)
}).$mount('#app');
