const CONTRACTSTATUS = {
    
    UNSENT :  {   STATUS : 0 , NAME : "Chưa gửi ", COLOR : 'rgb(0, 123, 0)'},
    PENDING : {   STATUS : 1 , NAME : "Chờ duyệt ", COLOR : 'rgb(0, 0, 0)'},
    REFUSE : {   STATUS : 2 , NAME : "Từ chối " , COLOR : 'rgb(255, 0, 0)'},
    APPROVED : {   STATUS : 3 , NAME : "Đã duyệt ", COLOR : 'rgb(0, 0, 255)'},

}
const TYPEREQUEST = [{name : "Thêm yêu cầu" }, {name : "Sửa yêu cầu"}]


export { CONTRACTSTATUS , TYPEREQUEST}
