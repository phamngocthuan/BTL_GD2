import { Select } from 'antd';
import { useEffect } from 'react';

/**
 * Component Select
 * onSubmitFailed
 */

const { Option } = Select;

export default function Selects(props){
  const {data, valueDefault, dataEnum, name , handleOnchangeSelect } = props;
  var elmtBodySelect ;
  if(dataEnum == null){
    elmtBodySelect = data.map((item,index) => {
      return (
        <Option key={index} value={item.ProductCode}>{item.ProductName}</Option>
      )
    })
  }else {
    elmtBodySelect = dataEnum.map((item,index) => {
      return (
        <Option key={index} value={item.name}>{item.name}</Option>
      )
    })
  }
  
    return (
        <Select
          name={name}
          defaultValue={valueDefault}
          showSearch
          style={{ width: 150 }}
          placeholder=""
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          onChange={(value) => {handleOnchangeSelect(name, value)}}
  >
    {elmtBodySelect}
  </Select>
    )
}