
import 'antd/dist/antd.css';
import './index.css';
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const { Option } = Select;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default function InputOption  (props) {
    return (
        <div className="site-input-group-wrapper">
    
            <Input.Group compact>
            <Select defaultValue="*">
                <Option value="*">*</Option>
                <Option value="=">=</Option>
            </Select>
            <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
            </Input.Group>
        </div>
    )
  
}

