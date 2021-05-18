import { callApi } from './CallApi'

/**
 * Component gọi API lấy thông tin về sản phẩm
 * @author PNTHUAN(11/05/2021)
 */

const ProductApi = {
    getCodes : async( success, failure) => {
        try {
            const res = await callApi.get(`api/v1/products/code`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure(ex?.response?.data);
        }

    }
}
export default ProductApi;

