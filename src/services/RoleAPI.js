import axios from 'axios';
import * as _ from 'lodash';

class RoleAPI {

    async getAllPrivileges() {
        const config = {
           url: 'http://localhost:3004/roles/privileges',
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

    async getAllRoles() {
        const config = {
            url: 'http://localhost:3004/roles',
            method: 'get'
         }
         const response = await axios(config);
         return response.data;
    }

    async addRole(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: 'http://localhost:3004/roles',
           method: 'post',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

    async updateRole(payload) {
        payload.institute_id= "63ca7cc6bb01821e03345a9a";
        const config = {
           url: `http://localhost:3004/roles/${payload.role_id}`,
           method: 'patch',
           data: payload
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new RoleAPI();