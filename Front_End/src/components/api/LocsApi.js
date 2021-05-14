import {callApi} from './CallApi'
import {getQueryParam} from '../../constants/CommonFunction'

const LocsApi = {
    getCity : async (type, success, failure) => {
        
        try {
            const res = await callApi.get(`api/v1/locations/locs?type=${type}`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }

    },
   getDistrict : async () => {

   }, 
   getWard : async () => {

   } 
}
export default LocsApi;

