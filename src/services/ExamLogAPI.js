import * as _ from 'lodash';
import axios from 'axios';

class ExamLogAPI {

    async add(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/exam_logs',
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async get(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: `http://localhost:3003/exam_logs/${payload.exam_log_id}`,
           method: 'get',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async saveAnswer(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: `http://localhost:3003/exam_logs/${payload.exam_log_id}/${payload.question_id}`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async submit(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: `http://localhost:3003/exam_logs/submit/${payload.exam_log_id}`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new ExamLogAPI();