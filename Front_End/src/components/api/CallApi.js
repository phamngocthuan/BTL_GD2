import axios from 'axios'
import 'process'

let paramHeader = {}

if( process.env.ENV === 'development'){
    paramHeader = {
        "CreatedBy" : "PNTHUAN",

    }
}else {
    paramHeader = {
        'Content-Type' : 'application/json',
    }
}

// khởi tạo header

const callApi = axios.create({
    headers : { ...paramHeader},
    baseURL: 'https://localhost:44388'
})
callApi.defaults.timeout=10000;

export {callApi, paramHeader};