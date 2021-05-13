import { callApi} from './CallApi'



const PackageApi = {
    get : async(productCode, success, failure) => {
        try {

            const res = await callApi.get(`api/v1/packages?productCode=${productCode}`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }

    }
}
export default PackageApi;

