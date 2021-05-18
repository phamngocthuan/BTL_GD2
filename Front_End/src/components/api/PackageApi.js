import { callApi} from './CallApi'


/**
 * Component Lấy thông tin về gói sản phẩm
 * @author PNTHUAN(11/5/2021)
 */
const PackageApi = {
    get : async(productCode, success, failure) => {
        try {

            const res = await callApi.get(`api/v1/packages?productCode=${productCode}`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }

    }
}
export default PackageApi;

