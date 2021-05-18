import {callApi} from './CallApi'
import {getQueryParam} from '../../constants/CommonFunction'
/**
 * Component gọi API Contract
 * Created by : PNTHUAN (10/5/2021)
 */
const ContractApi = {
    get : async(contractID, success, failure) => {
        try {
            const res = await callApi.get(`api/v1/contracts/${contractID}`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }

    },
    post : async (data, success, failure) =>  {
        try {
            const res = await callApi.post(`api/v1/contracts`,data)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }
    },
    update : async (contractID, data, success, failure) =>  {
        try {
            const res = await callApi.put(`api/v1/contracts/${contractID}`,data)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }
    },
    delete :  async (codes, success, failure) =>  {
        try {
            const res = await callApi.delete(`api/v1/contracts`,
            {data : codes}
            )
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }
    },
    filter :  async(body, headerParem, success, failure) => {
        var url = "api/v1/contracts/filter" + getQueryParam(headerParem);
        try {
            const res = await callApi.post(url ,
            body
            )
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }
    }, 
    getByCode : async (codeRequired, success, failure) => {
        var url = `api/v1/contracts/code?codeRequired=${codeRequired}`;

        try {
            const res = await callApi.get(url 
            )
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }
    },
    sendRequest : async(codeRequired, status, success, failure) => {
        try {
            const res = await callApi.put(`api/v1/contracts/status?status=${status}`,
                 codeRequired
            )
            if(success) success(res);
        }
        catch(ex){
            if(failure) failure(ex?.response?.data);
        }
    }
}
export default ContractApi;

