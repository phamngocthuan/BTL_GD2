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
export { getColorStatus, getProductCode , getPackageProduct}
