import * as _ from 'lodash';
import axios from 'axios';

class ConfigAPI {

    async getMicroservices() {
        const config = {
           url: `http://localhost:3001/configs/microservices`,
           method: 'get'
        }
        const response = await axios(config);
        return response.data;
    }

}

export default new ConfigAPI();