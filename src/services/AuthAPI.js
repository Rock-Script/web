import * as _ from 'lodash';
import axios from 'axios';

class AuthAPI {

    async login(payload) {
        const config = {
           url: `http://localhost:3005/auth/login`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async register(payload) {
        const config = {
           url: `http://localhost:3005/auth/register`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new AuthAPI();