state : các state bt
action : 
        return {
            type : '',
            payload : ''
        }
    
reducer : function 
    function (oldState, action){

        //
        return newState;
    }

store : gồm state, reducer
/////////
Có thể các bạn chưa biết Redux là một thư viện khá nhỏ với dung lượng chỉ có 2KB và nó có 3 methods quan trọng nhất là:

            getState để lấy state hiện tại của ứng dụng
            dispatch để gửi đi các action
            subscribe để nhận biết được sự thay đổi của state

mapStateToProps làm đúng như tên gọi của nó: nó kết nối một phần của Redux state với các props của một React component . Bằng cách đó, một React component được kết nối sẽ có quyền truy cập vào phần chính xác của store mà nó cần .

mapDispatchToProps làm điều gì đó tương tự, nhưng đối với các action. 
mapDispatchToProps kết nối các hành động Redux với các props React. Bằng cách này, một React component được kết nối sẽ có thể gửi messages đến store.
//////////////
import Vue from 'vue';
 const EventBus = new Vue({     
    methods : {         // Định dạng "tình trạng công việc"        
    formatStatus : function(data){            
        switch(parseInt(data)){                
            case 0 : return "Đang sử dụng";                
            case 1 : return "Ngừng sử dụng";                
            case 2 : return "Khác";                
            default : return "Khác";            }                },       
     formatDate(date) {            
        date = new Date(date);            
        if (Number.isNaN(date.getTime())) {                return "";            } else {                var day="",month="",year="";                day = date.getDate();                month = date.getMonth() + 1;                year = date.getFullYear();                day = day < 10 ? '0' + day : day;                month = month < 10 ? '0' + month : month;                return day + '/' + month + '/' + year;            }            },        
    formatMoney(money) {              
        if(money == null || money == "")
        {                return "";              }
        else {                money = parseFloat(money);                
        return money.toFixed(0).replace(/(.)(?=(\d{3})+$)/g, '$1.');
                      }                      },        
    formatGenner(genner) {                      
        var result = genner == 0 ? "Nam" : (genner == 1 ? "Nữ" : "Khác");              
        return result;        },       
        
         checkEmpty(data){            if( data== null || data.trim() == ""){                return false;            }            return true        }     } });export default EventBus;

        //////////////////


let paramHeader = {}

if( process.env.ENV === 'development'){
    paramHeader = {
        "createdBy" : "PNTHUAN",
    }
}else {
    paramHeader = {
        'Content-Type' : 'application/json',
    }
}
////////////////////////////////
/// 