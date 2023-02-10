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

}

export default new ExamLogAPI();