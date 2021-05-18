import {callApi} from './CallApi'
/**
 * Component gọi API lấy thông tin về xã, phường, huyện, Thành phố, quận
 * Created by : PNTHUAN(11/5/2021)
 */

const LocsApi = {
    getCity : async (type, success, failure) => {
        
        try {
            const res = await callApi.get(`api/v1/locations/locs?type=${type}`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }

    },
   getDistrict : async (type, parentLocationName, success, failure) => {
    try {
        
        const res = await callApi.get(`api/v1/locations/locs?type=${type}&parentLocationName=${parentLocationName}`)
        if(success) success(res)
    }
    catch (ex){
        if(failure) failure(ex?.response?.data);
    }
   }, 
   getWard : async (type, parentLocationName, success, failure) => {
    try {
        
        const res = await callApi.get(`api/v1/locations/locs?type=${type}&parentLocationName=${parentLocationName}`)
        if(success) success(res)
    }
    catch (ex){
        if(failure) failure(ex?.response?.data);
    }
   } 
}
export default LocsApi;

