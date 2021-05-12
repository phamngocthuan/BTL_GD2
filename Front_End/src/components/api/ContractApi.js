import {callApi} from './CallApi'
import {getQueryParam} from '../../constants/CommonFunction'

const ContractApi = {
    get : async(contractID, success, failure) => {
        try {
            const res = await callApi.get(`api/v1/contracts/${contractID}`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }

    },
    post : async (data, success, failure) =>  {
        try {
            const res = await callApi.post(`api/v1/contracts`,data)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }
    },
    update : async (contractID, data, success, failure) =>  {
        try {
            const res = await callApi.put(`api/v1/contracts/${contractID}`,data)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }
    },
    delete :  async (contractID, success, failure) =>  {
        try {
            const ids = [contractID]
            const res = await callApi.delete(`api/v1/contracts`,ids)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }
    },
    filter :  async(body, headerParem, success, failure) => {
        var url = "api/v1/contracts/filter" + getQueryParam(headerParem);
        console.log(getQueryParam(headerParem));
        try {
            const res = await callApi.post(url ,
            body
            )
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }
    }
}
export default ContractApi;

