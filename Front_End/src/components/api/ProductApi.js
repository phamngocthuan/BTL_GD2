import { callApi } from './CallApi'

/**
 * Component gọi API lấy thông tin về sản phẩm
 * @author PNTHUAN(11/05/2021)
 */

const ProductApi = {
    getCodes : async( success, failure) => {
            const res = await callApi.get(`api/v1/products/code`)
            let response =    res.data;
            return response;

    }
}
export default ProductApi;

