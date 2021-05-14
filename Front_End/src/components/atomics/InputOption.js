
import 'antd/dist/antd.css';

import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const { Option } = Select;

export default function InputOption  (props) {
    const {key, value, condition} = props;
    return (
        <div className="site-input-group-wrapper">
    
            <Input.Group compact>
            <Select defaultValue="*"
              showArrow={false}
            >
                <Option value="*">* </Option>
                <Option value="=">= </Option>
            </Select>
            <Input style={{ width: '70%' }} defaultValue="" />
            </Input.Group>
        </div>
    )
  
}

