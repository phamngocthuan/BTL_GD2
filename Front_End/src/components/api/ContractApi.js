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
    post : "",
    update : "",
    delete : "",
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