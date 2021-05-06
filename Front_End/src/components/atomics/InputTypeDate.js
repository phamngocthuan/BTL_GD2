import { DatePicker, Space } from 'antd';
import moment from 'moment';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default function InputDate(props){
    return (
    <Space direction="vertical" size={12}>

        <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />

    </Space>
    )
}