import {callApi} from './CallApi'
import {getQueryParam} from '../../constants/CommonFunction'
/**
 * Component gọi API Contract
 * Created by : PNTHUAN (10/5/2021)
 */
const ContractApi = {
    get : async(contractID, success, failure) => {
        const res = await callApi.get(`api/v1/contracts/${contractID}`)
        let response =    res.data;
        return response;

    },
    post : async (data, success, failure) =>  {
        const res = await callApi.post(`api/v1/contracts`,data)
        let response =    res.data;
        return response;
    },
    update : async (contractID, data, success, failure) =>  {
            const res = await callApi.put(`api/v1/contracts/${contractID}`,data)
            let response =    res.data;
            return response;
    },
    delete :  async (codes, success, failure) =>  {
        const res = await callApi.delete(`api/v1/contracts`,{data : codes})
        let response =    res.data;
        return response;
    },
    filter :  async(body, headerParem, success, failure) => {
        var url = "api/v1/contracts/filter" + getQueryParam(headerParem);
        const res = await callApi.post(url ,
        body
        )
        let response =    res.data;
        return response;
    }, 
    getByCode : async (codeRequired, success, failure) => {
        var url = `api/v1/contracts/code?codeRequired=${codeRequired}`;
        const res = await callApi.get(url)
        let response = res.data;
        return response;
       
    },
    sendRequest : async(codeRequired, status, success, failure) => {

        const res = await callApi.put(`api/v1/contracts/status?status=${status}`,codeRequired)
        let response =    res.data;
        return response;
    }
}
export default ContractApi;

