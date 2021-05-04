import axiosClient from './axiosClient';
import commonFunction from '../constants/commonFunction';
import { HOST_URL } from '../constants/endPoint';

const baseApi = {
    post: async function (
        onSuccess,
        onFailure,
        beforeExecute,
        endpoint,
        queryParam,
        body,
        config
    ) {
        if (beforeExecute) beforeExecute();
        try {
            let response = await axiosClient.post(
                endpoint + commonFunction.generateQueryParam(queryParam),
                body,
                config
            );
            if (onSuccess) onSuccess(response);
        } catch (ex) {
            if (onFailure) onFailure(ex?.response?.data);
        }
    },

    put: async function (
        onSuccess,
        onFailure,
        beforeExecute,
        endpoint,
        queryParam,
        body,
        config
    ) {
        if (beforeExecute) beforeExecute();
        try {
            let response = await axiosClient.put(
                endpoint + commonFunction.generateQueryParam(queryParam),
                body,
                config
            );
            if (onSuccess) onSuccess(response);
        } catch (ex) {
            if (onFailure) onFailure(ex?.response?.data);
        }
    },
    get: async function (
        onSuccess,
        onFailure,
        beforeExecute,
        endpoint,
        queryParam,
        config
    ) {
        if (beforeExecute) beforeExecute();
        try {
            let response = await axiosClient.get(
                endpoint + commonFunction.generateQueryParam(queryParam),
                config
            );
            if (onSuccess) onSuccess(response);
        } catch (ex) {
            if (onFailure) onFailure(ex?.response?.data);
        }
    },

    delete: async function (
        onSuccess,
        onFailure,
        beforeExecute,
        endpoint,
        queryParam,
        body,
        config
    ) {
        if (beforeExecute) beforeExecute();
        try {
            let response = await axiosClient.delete(
                endpoint + commonFunction.generateQueryParam(queryParam),
                { ...config, data: body }
            );
            if (onSuccess) onSuccess(response);
        } catch (ex) {
            if (onFailure) onFailure(ex?.response?.data);
        }
    },
};

export default baseApi;

//////////////////////////////////
import { notification } from 'antd';
import axios from 'axios';
import { historyApp } from '../App';
import { LOCAL_STORAGE_KEY } from '../constants/commonConstants';

let headers = {};


if (
    process.env.NODE_ENV.toLowerCase() === 'development' ||
    process.env.NODE_ENV.toLowerCase() == ''
) {
    headers = {
        'x-company-id': 'ad8752a7-75c3-4e41-9346-f64e37941477',
        'x-full-name': 'msa', //Convert to base64
        // 'x-company-id': localStorage.getItem(LOCAL_STORAGE_KEY.COMPANY_ID),
        // 'x-full-name': btoa(
        //     unescape(encodeURIComponent(localStorage.getItem(LOCAL_STORAGE_KEY.NAME)))
        // ), //Convert to base64
        'x-company-code': localStorage.getItem(LOCAL_STORAGE_KEY.COMPANY_CODE),
        'x-platform-session-id': localStorage.getItem(LOCAL_STORAGE_KEY.PLATFORM_SESSION_ID),
        'x-user-id': localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID),
        'x-aimarketing-session-id': localStorage.getItem(LOCAL_STORAGE_KEY.AIMARKETING_SESSION_ID),
    };
} else {
    headers = {
        'Content-Type': 'application/json',
    };
}

//TODO: Check ENV để dùng đúng đầu base API
const axiosClient = axios.create({
    headers: { ...headers },
});

//Timeout Request API
axiosClient.defaults.timeout = 30000;

//Lấy accessToken để vào header mỗi lần có request gửi đi
axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('access_token_ldz') ?? '';
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            //TODO: Uncomment khi push code
            historyApp.push('/408');
        }
        // Handle errors
        else if (historyApp) {
            switch (error?.response?.status) {
                case 401:
                    historyApp.push('/401');
                    break;
                case 500:
                    historyApp.push('/500');
                    break;
                case 403:
                    historyApp.push('/403');
                    break;
                default:
                    break;
            }
        }
        return;
    }
);
export default axiosClient;
export { headers };
