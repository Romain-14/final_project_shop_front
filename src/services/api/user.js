import axios from 'axios';
import {config} from '../../config/index';

export const checkToken = async (token) => {
    try {
        const res = await axios.get(`${config.api_url}/api/v1/auth/checkToken`, { headers : {"x-access-token": token}})
        return res.data
    } catch (error) {
        return error;
    }
}

export const signin = async (datas) => {
    try {
        const res = await axios.post(`${config.api_url}/api/v1/user/signin`, datas)
        return res.data
    } catch (error) {
        return error
    }
}
export const signup = async (datas) => {
    console.log(datas)
    try {
        const res = await axios.post(`${config.api_url}/api/v1/user/signup`, datas)
        return res.data
    } catch (error) {
        return error
    }
}

export const updateLastConnectionDate = async (uuid, token) => {
    try {
        const res = await axios.patch(`${config.api_url}/api/v1/user/updateConnectionDate/${uuid}`, {}, { headers : {"x-access-token": token}})
        return res.data
    } catch (error) {
        return error
    }
}

export const updateInfos = async (datas, token) => {
    try {
        const res = await axios.patch(`${config.api_url}/api/v1/user/update/${datas.uuid}`, {datas}, { headers : {"x-access-token": token}})
        return res.data
    } catch (error) {
        return error
    }
}

export const validateAccount = async (datas) => {
    try {
        const res = await axios.patch(`${config.api_url}/api/v1/user/updateValidateAccount/${datas.uuid}`, {datas});
        return res.data
    } catch (error) {
        return error
    }
}

export const getAllUsers = async (TOKEN) => {
    try {
        const res = await axios.get(`${config.api_url}/api/v1/user`, {headers: {"x-access-token": TOKEN}});
        console.log(res)
        return res.data;
    } catch (error) {
        return error;
    }
}
