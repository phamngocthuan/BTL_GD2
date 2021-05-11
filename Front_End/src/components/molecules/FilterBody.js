
import React, {  useState} from 'react';
import '../../assets/styles/molecules/FilterBody.scss'
import ItemOption from '../atomics/ItemOption'
import { Radio } from 'antd';
import Selects from '../atomics/Select'
import InputDate from '../atomics/InputTypeDate'


FilterBody.propTypes = {

};
const statusArray = [
    {status : 'Chưa gửi', color : '#007b00', value : 0},
    {status : 'Chờ duyệt', color : '#000000', value : 1},
    {status : 'Từ chối', color : '#ff0000', value : 2},
    {status : 'Đã duyệt', color : '#0000ff', value : 3},
]
function FilterBody(props) {

    const {status, setStatus} = props;
    // const [value, setValue] = useState(status[0].value)
    const elemtStatus = statusArray.map((item,index) => {
        return (
            <Radio value={item.value} key={index    }>
                {item.status}
            </Radio>
        )
    })
    const onChange = e => {
        setStatus(e.target.value);
        
    };
    return (
        <div className='filter-body-content'>
            <div className='filter-top'>
               
                <Radio.Group onChange={onChange} value={status}>
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
