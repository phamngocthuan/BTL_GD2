import axios from 'axios'
import 'process'


// khởi tạo header

const callApi = axios.create({
    headers : { "createdBy" : "PNTHUAN", 'Content-Type': 'application/json',"modifiedBy" : "PNTHUAN"},
    baseURL: 'https://localhost:44388'
})
callApi.defaults.timeout=10000;

export {callApi};

