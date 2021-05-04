import e from 'cors';
import React, {  } from 'react';
import '../../assets/styles/molecules/FilterBody.scss'
import ItemOption from '../atomics/ItemOption'


FilterBody.propTypes = {

};
const status = [
    {status : 'Chưa gửi11', color : '#007b00'},
    {status : 'Chờ duyệt', color : '#000000'},
    {status : 'Từ chối', color : '#ff0000'},
    {status : 'Đã duyệt', color : '#0000ff'},
]
function FilterBody(props) {
    
    const elemtStatus = status.map((item,index) => {
        return (
            <ItemOption key={index} content={item.status} nameIcon={"InputRadio"} >

            </ItemOption>
        )
    })

    return (
        <div className='filter-body-content'>
            <div className='filter-top'>
                {elemtStatus}
                <div>
                    Xem theo
                    <select>
                        <option>abc</option>
                    </select>
                </div>
            </div>
            <div className='filter-bottom'>
                    Chọn theo thời gian
            </div>
            
        </div>
    );
}

export default FilterBody;
