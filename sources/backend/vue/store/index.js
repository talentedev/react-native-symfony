import Vue from 'vue';
import Vuex from 'vuex';
import ClientsModule from './clients';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        clients: ClientsModule,
    },
});