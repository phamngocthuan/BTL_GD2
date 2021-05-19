
import 'antd/dist/antd.css';

import { Input  , Select } from 'antd';
import {setFilter, updateFilter, removeFilter} from '../../redux/action/index'
import { useSelector, useDispatch } from 'react-redux'
import React, {useState} from 'react'
import {getCondition} from '../../constants/CommonFunction'
const { Option } = Select;
/**
 * Component Hiển thị các option dưới dạng dropdown
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */

export default function InputOption  (props) {
    const dispatch = useDispatch(); 
    // o : add
    // 1  : update
    // 2 : delete
    const [status, setStatus] = useState(0);
    const {name} = props;
    const [condition, setCondition] = useState(2)
    return (
        <div className="site-input-group-wrapper">
    
            <Input.Group compact>
            <Select defaultValue="*"
              showArrow={false}
              onChange={(value) => {
                  setCondition(getCondition(value));
              }}
            >
                <Option value="*">* </Option>
                <Option value="=">= </Option>
            </Select>
            <Input 
                style={{ width: '72%' }} 
                defaultValue=""
                name={name}
                // Nhận sự kiện enter để kiểm tra xem
                // giá trị đó đã có trong request chưa để thực hiện : update, thêm , hoặc remove khi nó là null || empty
                onPressEnter= {async (e) => {
                    var obj = {
                        key : e.target.name,
                        value : e.target.value,
                        condition : condition
                    }
                    if(e.target.value.trim() === ""){
                        await dispatch(removeFilter({data : obj}))
                        setStatus(0);
                    }
                    else
                    {
                        if(status === 0){
                            await dispatch(setFilter({data : obj}))
                            setStatus(1);
                        }
                        if(status === 1){
                            await dispatch(updateFilter({data : obj}))
                        }

                    }
                        
                }}
            />
            </Input.Group>
        </div>
    )
  
}

