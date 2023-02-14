import axios from 'axios';
import * as _ from 'lodash';

class CourseAPI {

    base_url;

    async getAll(params) {
        let query_string = _.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const config = {
           url: `${this.base_url}/courses?` + query_string,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async get(_id) {
        const config = {
           url: `${this.base_url}/courses/${_id}`,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async add(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: `${this.base_url}/courses`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async update(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: `${this.base_url}/courses/${payload._id}`,
           method: 'patch',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new CourseAPI();