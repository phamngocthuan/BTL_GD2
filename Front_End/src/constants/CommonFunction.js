const _ = require('lodash');
import $ from 'jquery'; 
import {CONTRACTSTATUS,STATUS} from './Enum'
import {PackageProduct, Product} from '../constants/FakeData'


function getColorStatus (status){
    var b = [status]
    const filteredObj = _.pick(CONTRACTSTATUS, b)
    return filteredObj[`${status}`]?.COLOR;
}
function formatDateToYMD (date){
    var newdate = date.split("/").reverse().join("/");
    return newdate;
}
function getStatus (value){
    return STATUS[value];
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
function getCondition(str){
    switch(str){
        case '*' : 
            return 2;
        case '=' : 
            return 0;
        default : 
            return 1; 
    }
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
function formatDate(date) {            
    date = new Date(date);            
    if (Number.isNaN(date.getTime())) {
         return "";
    } else {   
            var day="",month="",year="";  
            day = date.getDate();             
            month = date.getMonth() + 1;             
            year = date.getFullYear();             
            day = day < 10 ? '0' + day : day;              
            month = month < 10 ? '0' + month : month;           
            return day + '/' + month + '/' + year;       
    }          
}
function formatMoney(money) {
    if(money == null || money == ""){
      return "";
    }else {
      money = parseFloat(money);
      return money.toFixed(0).replace(/(.)(?=(\d{3})+$)/g, '$1.');
    }
    
}
export {formatMoney, getStatus, getColorStatus, getProductCode , getPackageProduct, getQueryParam, formatDate, getCondition, formatDateToYMD}
