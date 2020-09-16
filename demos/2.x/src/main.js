import Vue    from 'vue';

import router from './router'
import config from './config'

import App from './pages/Index.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: router,
    config: config,
    render: h => h(App)
});