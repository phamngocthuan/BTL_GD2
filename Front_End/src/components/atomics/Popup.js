import React from "react"



const Popup = ({record, visible, x, y}) => {

  const handleOnclick = () => {
    console.log(record);
  }

  return (
    visible &&
    <ul className="popup" style={{left: `${x - 224}px`, top: `${y - 140}px`}}>
      <li onClick={handleOnclick}>Gửi yêu cầu</li>
      <li>Like it</li>
      <li>Bookmark</li>
    </ul>
  )

}

export default Popup