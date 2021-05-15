import { DatePicker, Space } from 'antd';
import moment from 'moment';
import {formatDateToYMD}from '../../constants/CommonFunction'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default function InputDate(props){
    const {name,condition, addReqDate} = props;
    return (
    <Space direction="vertical" size={12}>

        <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList}
            onChange={(date, datestring) => {
                if(datestring.trim() != ""){
                    const obj = formatDateToYMD(datestring)
                    const ob = {
                        key : name,
                        value : obj,
                        condition : condition
                    }
                    addReqDate(ob);
                }
                
            }}
        />

    </Space>
    )
}