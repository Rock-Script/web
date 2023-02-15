import * as _ from 'lodash';
import axios from 'axios';

class AuthAPI {
    
    base_url;
    
    async login(payload) {
        const config = {
           url: `${this.base_url}/auth/login`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async loginWithRefreshToken(payload) {
        const config = {
           url: `${this.base_url}/auth/login/refresh_token`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }


    async register(payload) {
        const config = {
           url: `${this.base_url}/auth/register`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async verifyEmail(payload) {
        const config = {
           url: `${this.base_url}/auth/verify_email`,
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new AuthAPI();