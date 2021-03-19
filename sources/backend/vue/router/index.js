import Vue from 'vue';
import VueRouter from 'vue-router';
import Settings from '../views/Settings';
import BusinessAccounts from '../views/BusinessAccounts.vue';
import PromotionList from '../views/PromotionList.vue';

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/backoffice/settings',  name: 'settings', component: Settings, },
        { path: '/backoffice/accounts', component: BusinessAccounts, name:'BusinessAccounts' },
        { path: '/backoffice/promotions', component: PromotionList, name:'PromotionList' },
        { path: '*', redirect: '/backoffice/accounts' }
    ],
});

export default router;
