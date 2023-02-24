import axios from 'axios';
import * as _ from 'lodash';

class InstituteAPI {

    base_url;

    async getAll(params) {
        let query_string = _.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const config = {
           url: `${this.base_url}/institutes?` + query_string,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async get(_id) {
        const config = {
           url: `${this.base_url}/institutes/${_id}`,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async add(payload) {
        const config = {
           url: `${this.base_url}/institutes`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async update(payload) {
        const config = {
           url: `${this.base_url}/institutes/${payload._id}`,
           method: 'patch',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new InstituteAPI();