import * as _ from 'lodash';
import axios from 'axios';

class ExamAPI {

    async getAll(payload) {
        const query_params = _.keys(payload).map(k => `${k}=${payload[k]}`);
        const config = {
           url: `http://localhost:3003/exams?${query_params}`,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async get(exam_id) {
        const config = {
           url: 'http://localhost:3003/exams/' + exam_id,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }


    async add(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/exams',
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async update(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/exams/' + payload._id,
           method: 'patch',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async publish(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/exams/' + payload._id + '/publish',
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new ExamAPI();