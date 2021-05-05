import React, {  } from 'react';
import '../../assets/styles/molecules/Manipolation.scss'
import ItemOption from '../atomics/ItemOption'


Manipolation.propTypes = {

};
const action = [
    'Thêm', 'Sửa', 'Xóa', 'Nạp'
]
const status = [
    {status : 'Chưa gửi', color : '#007b00'},
    {status : 'Chờ duyệt', color : '#000000'},
    {status : 'Từ chối', color : '#ff0000'},
    {status : 'Đã duyệt', color : '#0000ff'},
]

function Manipolation(props) {
    const elemtAction = action.map((item,index) => {
        return (
            <ItemOption key={index} content={item} nameIcon={'abc'}>

            </ItemOption>
        )
    })
    const elemtStatus = status.map((item,index) => {
        return (
            <ItemOption key={index} content={item.status} squareShape={item.color}>

            </ItemOption>
        )
    })
    

    return (
        <div className="manipulation">
            <div>
                {elemtAction}
            </div>
            <div style={{ alignItems : 'center'}}>
                {elemtStatus}
            </div>
            
        </div>
    );
}

export default Manipolation;