import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueToastr from "vue-toastr";
// HTTP connexion to the API
// const httpLink = new HttpLink({
//     // You should use an absolute URL here
//     uri: '/graphql',
// });

import { createUploadLink } from 'apollo-upload-client';

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: createUploadLink(),
    cache,
});

Vue.use(VueApollo);
Vue.use(VueToastr);
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

new Vue({
    template: '<App/>',
    components: { App },
    apolloProvider,
    router,
    store,
}).$mount('#app');