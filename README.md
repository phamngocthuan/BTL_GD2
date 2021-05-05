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
///////////////////////////
Modal 
////////////////////////////
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../atomics/Icon';
import '../../assets/styles/atomics/modal.css';
Modal.propTypes = {
    title: PropTypes.string,
    mess: PropTypes.any,
    width: PropTypes.string,
    img: PropTypes.string,
    buttons: PropTypes.array,
    show: PropTypes.bool,
    onClickClose: PropTypes.func,
    messInnerHTML: PropTypes.any,
};

/**
 * Component modal
 * @param {*} props
 * @author LQTUAN (28/12/2020)
 */
function Modal(props) {
    const { title, mess, width, img, buttons, onClickClose, messInnerHTML } = props;
    const List = buttons
        ? buttons.map((button, index) => (
              <div key={index} className="modal-button-item">
                  {button}
              </div>
          ))
        : '';
    return (
        <div className={props.show ? 'modal modal-show' : 'modal modal-hide'}>
            <div className="modal-background"></div>
            <div className="modal-main">
                <div className="modal-icon-close" onClick={onClickClose}>
                    <Icon name="IconTime" fill="#6E717D" />
                </div>
                {img ? (
                    <div className="modal-img">
                        <Icon name={img} />
                    </div>
                ) : (
                    ''
                )}
                {title ? <div className="modal-title font-large-title-1">{title}</div> : ''}
                {messInnerHTML ? (
                    <div
                        className="modal-mess font-body"
                        dangerouslySetInnerHTML={{
                            __html: messInnerHTML,
                        }}
                    ></div>
                ) : mess ? (
                    <div className="modal-mess font-body">{mess}</div>
                ) : (
                    ''
                )}
                {buttons ? <div className="modal-button">{List}</div> : ''}
            </div>
        </div>
    );
}
export default Modal;
///////////////////////////////////////
.body {
    position: relative;
}

.modal {
    width: 100vw;
    height: 100vh;
    top: 0px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 604;
}

.modal-hide {
    display: none !important;
}

.modal-background {
    position: fixed;
    background-color: #060E2E;
    opacity: 20%;
    border: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
}

.modal-main {
    padding: 64px;
    position: relative;
    border-radius: 12px;
    position: fixed;
    z-index: 3;
    background-color: #fff;
    width: 634px;
    box-shadow: 5px 20px 40px #00000033;
    text-align: center;
    padding-bottom: 40px;
    padding-top: 36px;
}

.modal-icon-close {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
}

.modal-img {
    margin-bottom: 20px;
}

.modal-title {
    margin-bottom: 16px;
}

.modal-title.font-large-title-1 {
    color: #060E2E;
}

.modal-mess {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-button {
    margin-top: 32px;
    display: flex;
    justify-content: center;
}

.modal-button .btn-type-1 {
    color: #060E2E;
}

.modal-button-item {
    margin: 0 4px;
}

.modal-button-item .button-container {
    min-width: 120px;
}

.modal-mess span.font-title-3{
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
}