import axios from 'axios';

import {config} from '../../config/index';

export const getProducts = async () => {
    try {
        const res = await axios.get(`${config.api_url}/api/v1/product`)
        return res.data;
    } catch (error) {
        return error;
    }
}