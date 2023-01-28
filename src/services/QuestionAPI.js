import axios from 'axios';

class QuestionAPI {

    async getAll() {
        const config = {
           url: 'http://localhost:3003/questions',
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async add(exam_id, payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/questions/' + exam_id,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async update(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/questions/' + payload.exam_id + "/" + payload._id,
           method: 'patch',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async delete(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3003/questions/' + payload.exam_id + "/" + payload._id,
           method: 'delete',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new QuestionAPI();