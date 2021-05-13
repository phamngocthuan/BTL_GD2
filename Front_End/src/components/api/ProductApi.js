import { callApi } from './CallApi'



const ProductApi = {
    getCodes : async( success, failure) => {
        try {
            const res = await callApi.get(`api/v1/products/code`)
            if(success) success(res)
        }
        catch (ex){
            if(failure) failure();
        }

    }
}
export default ProductApi;

