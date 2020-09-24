import Vue       from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadView(view) {
    return () => import(`../pages/${view}.vue`);
}

Vue.router = new VueRouter({
    hashbang: false,
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        redirect: {
            name: 'site-default'
        }
    }, {
        path: '/default',
        name: 'site-default',
        component: loadView('site/Default'),
    }, {
        path: '/sizes',
        name: 'site-sizes',
        component: loadView('site/Sizes'),
    }, {
        path: '/speed',
        name: 'site-speed',
        component: loadView('site/Speed'),
    }, {
        path: '/labels',
        name: 'site-labels',
        component: loadView('site/Labels'),
    }, {
        path: '/html',
        name: 'site-html',
        component: loadView('site/Html'),
    }, {
        path: '/angles',
        name: 'site-angles',
        component: loadView('site/Angles'),
    }, {
        path: '/dial',
        name: 'site-dial',
        component: loadView('site/Dial'),
    }, {
        path: '/ranges',
        name: 'site-ranges',
        component: loadView('site/Ranges'),
    }, {
        path: '/slider',
        name: 'site-slider',
        component: loadView('site/Slider'),
    }]
});

export default Vue.router;