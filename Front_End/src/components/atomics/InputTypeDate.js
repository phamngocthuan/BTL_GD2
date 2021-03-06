import { DatePicker, Space } from 'antd';
import moment from 'moment';
import {formatDateToYMD}from '../../constants/CommonFunction'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
/**
 * Component input type = date
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
export default function InputDate(props){
    const {name , condition, addReqDate} = props;
    return (
    <Space direction="vertical" size={12}>

        <DatePicker  
            format={dateFormatList}
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
            allowClear={false}
            placeholder={"dd/mm/yy"}
        />

    </Space>
    )
}