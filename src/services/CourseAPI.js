import axios from 'axios';
import * as _ from 'lodash';

class CourseAPI {

    async getAll(params) {
        let query_string = _.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const config = {
           url: 'http://localhost:3003/courses?' + query_string,
           method: 'get'
        }
        console.log('courses API getall')
        const response = await axios(config);
        return response.data;
    }

    async get(_id) {
        const config = {
           url: 'http://localhost:3003/courses/' + _id,
           method: 'get'
        }
        console.log('courses API get')
        const response = await axios(config);
        return response.data;
    }

    async add(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/courses',
           method: 'post',
           data: payload
        }
        console.log('courses API add')
        const response = await axios(config);
        return response.data;
    }

    async update(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/courses/' + payload._id,
           method: 'patch',
           data: payload
        }
        console.log('courses API update')
        const response = await axios(config);
        return response.data;
    }

}

export default new CourseAPI();