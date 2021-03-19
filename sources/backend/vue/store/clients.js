import ClientsAPI from '../api/clients';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        clients: [],
        client : {},
        total : null,
        size : 10,
        currentPage : 1
    },
    getters: {
        isLoading (state) {
            return state.isLoading;
        },
        hasError (state) {
            return state.error !== null;
        },
        error (state) {
            return state.error;
        },
        hasClients (state) {
            return state.clients.length > 0;
        },
        clients (state) {
            return state.clients;
        },
        client(state){
            return state.client ;
        },
        total(state){
            return state.total;
        },
        pagesize(state){
            return state.pagesize;
        },
        currentPage(state){
            return state.currentPage;
        }
    },
    mutations: {
        ['FETCHING_CLIENTS'](state) {
            state.isLoading = true;
            state.error = null;
            state.clients = [];
        },
        ['FETCHING_CLIENTS_SUCCESS'](state, data) {
            state.isLoading = false;
            state.error = null;
            state.clients = data.clients;
            state.total = data.total;
            state.pagesize = data.size ;
            state.currentPage = data.page;
        },
        ['FETCHING_CLIENTS_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.clients = [];
        },
        ['FETCHING_CLIENT'](state) {
            state.isLoading = true;
            state.error = null;
            state.client = {};
        },
        ['FETCHING_CLIENT_SUCCESS'](state, data) {
            state.isLoading = false;
            state.error = null;
            state.client = data.client;
        },
        ['FETCHING_CLIENT_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.client = {};
        },
        ['DELETING_CLIENT'](state) {
            state.isLoading = true;
            state.error = null;
        },
        ['DELETING_CLIENT_SUCCESS'](state, data) {
            state.isLoading = false;
            state.error = null;
            state.client = {}
        },
        ['DELETING_CLIENT_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
        },
        ['SETING_CURRRENT_PAGE'](state, currentPage) {
            state.currentPage = currentPage;
        },
        ['SAVE_CLIENT'](state) {
            state.isLoading = true;
            state.error = null;
        },
        ['SAVE_CLIENT_SUCCESS'](state) {
            state.isLoading = false;
            state.error = null;
        },
        ['SAVE_CLIENT_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
        },
    },
    actions: {
        fetchClients ({commit}, playload) {
            commit('FETCHING_CLIENTS');
            return ClientsAPI.getClients(playload)
                .then(res => commit('FETCHING_CLIENTS_SUCCESS', res.data.data))
                .catch(err => commit('FETCHING_CLIENTS_ERROR', err));
        },
        fetchClient ({commit}, playload) {
            commit('FETCHING_CLIENT');
            return ClientsAPI.getClient(playload)
                .then(res => commit('FETCHING_CLIENT_SUCCESS', res.data.data))
                .catch(err => commit('FETCHING_CLIENT_ERROR', err));
        },
        deleteClient ({commit}, playload) {
            commit('DELETING_CLIENT');
            return ClientsAPI.deleteClient(playload)
                .then(res => commit('DELETING_CLIENT_SUCCESS', res.data.data))
                .catch(err => commit('DELETING_CLIENT_ERROR', err));
        },
        setCurrentPage({commit}, playload){
            commit('SETING_CURRRENT_PAGE', playload) ;
        },
        saveClient({commit}, playload){
            commit('SAVE_CLIENT', playload) ;
            return ClientsAPI.saveClient(playload)
                .then(res => commit('SAVE_CLIENT_SUCCESS'))
                .catch(err => commit('SAVE_CLIENT_ERROR', err));
        }
    },
}