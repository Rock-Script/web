import axios from 'axios';

class ExamAPI {

    async getAll() {
        const config = {
           url: 'http://localhost:3003/exams',
           method: 'get'
        }
        console.log('members API getall')
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
        console.log('members API add')
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
        console.log('members API update')
        const response = await axios(config);
        return response.data;
    }

}

export default new ExamAPI();