import React from "react"

import { useSelector, useDispatch } from 'react-redux'
import { removeRecordTable, setDataTabPane} from '../../redux/action/index'

const Popup = ({record, visible, x, y}) => {
  
  const dispatch = useDispatch(); 
  const handleOnclick = () => {
    console.log(record);
  }

  const rmRecordSeleted = () => {
    // Kiểm tra xem bản ghi đó đã chọn chưa
    // Nếu chưa thì bỏ chọn
    dispatch(removeRecordTable({data : record}))
    dispatch(setDataTabPane({data : {}}))
  }
  return (
    visible &&
    <ul className="popup" style={{left: `${x - 224}px`, top: `${y - 140}px`}}>
      <li onClick={handleOnclick}>Gửi yêu cầu</li>
      <li onClick={rmRecordSeleted}>Bỏ chọn</li>
      <li>Bookmark</li>
    </ul>
  )

}

export default Popup