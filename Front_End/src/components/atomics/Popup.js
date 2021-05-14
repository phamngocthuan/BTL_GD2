import React from "react"




  

export default function Popup(props){
  const {record, visible, x, y} = props;
  return (
    <>
      {
        visible && <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
        <li>hello</li>
        <li>Like it</li>
        <li>Bookmark</li>
      </ul>
      }
    </>
  )
}
