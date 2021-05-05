
import React, {  useState} from 'react';
import '../../assets/styles/molecules/FilterBody.scss'
import ItemOption from '../atomics/ItemOption'
import { Radio } from 'antd';
import Selects from '../atomics/Select'
import InputDate from '../atomics/InputTypeDate'


FilterBody.propTypes = {

};
const status = [
    {status : 'Chưa gửi', color : '#007b00'},
    {status : 'Chờ duyệt', color : '#000000'},
    {status : 'Từ chối', color : '#ff0000'},
    {status : 'Đã duyệt', color : '#0000ff'},
]
function FilterBody(props) {

    const [value, setValue] = useState(status[0].status)
    const elemtStatus = status.map((item,index) => {
        return (
            <Radio value={item.status}>
                {item.status}
            </Radio>
        )
    })
    const onChange = e => {
        setValue(e.target.value);
    };
    return (
        <div className='filter-body-content'>
            <div className='filter-top'>
               
                <Radio.Group onChange={onChange} value={value}>
                {elemtStatus}
                </Radio.Group>

            </div>
            <div className='filter-bottom'>
                    <div className="pre-time">
                        <span style={{paddingRight:'5px'}}>Từ</span>
                        <InputDate />
                    </div>
                    <div className="bef-time">
                        <span style={{paddingRight:'5px'}}>Đến</span>
                        <InputDate />
                    </div>
            </div>
            
        </div>
    );
}

export default FilterBody;
