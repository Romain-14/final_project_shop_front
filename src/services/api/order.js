import axios from 'axios';

import {config} from '../../config/index';

export const saveOrder = async (datas, TOKEN) => {
    try {
        const res = await axios.post(`${config.api_url}/api/v1/order/save`, datas, {headers: {"x-access-token": TOKEN}});
        console.log(res)
        return res.data;
    } catch (error) {
        return error;
    }
}


export const getAllOrdersByValue = async (uuid, TOKEN) => {
    try {
        const res = await axios.get(`${config.api_url}/api/v1/order/${uuid}`, {headers: {"x-access-token": TOKEN}});
        console.log('RES.DATA', res.data)
        return res.data;
    } catch (error) {
        return error
    }
}

// export const showDetailOrder = async () => {
//     try {
//         const res = await axios.get(`${config.api_url}/api/v1/order/${id}`)
//     } catch (error) {
//         return error;
//     }
// }