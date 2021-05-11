const _ = require('lodash');
import $ from 'jquery'; 
import {CONTRACTSTATUS} from './Enum'
import {PackageProduct, Product} from '../constants/FakeData'


function getColorStatus (status){
    var b = [status]
    const filteredObj = _.pick(CONTRACTSTATUS, b)
    return filteredObj[`${status}`]?.COLOR;
}

function getProductCode (){
    return Product;
}
function getPackageProduct (productCode){
    if(productCode == null || productCode == ""){
        productCode = 'QLNS'
    }
    var packageProduct = PackageProduct.filter((item) => {
        return item.ProductCode === productCode;
    })
    return packageProduct[0].PackageProductName;

}

function getQueryParam(obj){
    if (obj) {
        let keys = Object.keys(obj);
        if (keys.length > 0) {
            let query = '?';
            for (let i = 0; i < keys.length; i++) {
                if (obj[keys[i]] != null && obj[keys[i]] !== '') {
                    if (query.length > 1) {
                        query = query + '&';
                    }
                    query = query + keys[i] + '=' + obj[keys[i]];
                }
            }
            if (query === '?') return '';
            return query;
        }
    }
    return '';
}
export { getColorStatus, getProductCode , getPackageProduct, getQueryParam}
