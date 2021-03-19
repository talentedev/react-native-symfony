import axios from 'axios';

export default {
    getAllProductCatalogs () {
        return axios.get('/api/product/list-catalogs');
    }
}