import { callApi} from './CallApi'


/**
 * Component Lấy thông tin về gói sản phẩm
 * @author PNTHUAN(11/5/2021)
 */
const PackageApi = {
    get : async(productCode, success, failure) => {
            const res = await callApi.get(`api/v1/packages?productCode=${productCode}`)
            let response =    res.data;
            return response;

    }
}
export default PackageApi;

