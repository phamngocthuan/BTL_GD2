import { Select } from 'antd';

const { Option } = Select;

export default function Selects(props){
    return (
        <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="1">MISA 1</Option>
    <Option value="2">MISA 2</Option>
    <Option value="3">MISA 3</Option>
    <Option value="4">MISA 4</Option>
  </Select>
    )
}