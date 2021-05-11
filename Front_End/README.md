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