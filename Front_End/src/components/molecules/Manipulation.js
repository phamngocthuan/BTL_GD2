import React, { useEffect, useState } from 'react';
import '../../assets/styles/molecules/Manipulation.scss'
import ItemOption from '../atomics/ItemOption'
import Modal from '../molecules/Modal'
import BodyModal from '../atomics/BodyModal'
import { useSetState } from 'react-use';
Manipulation.propTypes = {

};
const action = [
    {title: "Thêm", nameIcon: "Pointer", state : "Add", content : "Thêm yêu cầu"},
    {title: "Sửa", nameIcon: "IconModify", state : "Modified", content : "Sửa"},
    {title: "Xóa", nameIcon: "IconDelete", state : "Delete", content : "Xóa"},
    {title: "Nạp", nameIcon: "IconDownload", state : "Download", content : "Nạp"},
]
const status = [
    {status : 'Chưa gửi', color : '#007b00'},
    {status : 'Chờ duyệt', color : '#000000'},
    {status : 'Từ chối', color : '#ff0000'},
    {status : 'Đã duyệt', color : '#0000ff'},
]



function Manipulation(props) {

    const {data, setData, rowSelected} = props;
    const [hideModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('Thêm yêu cầu')
    const [method , setMethod] = useState('Add');

    const showModal = (title, state) => {
        setMethod(state)  
        if(rowSelected > 0 || method ==='Add'){
            console.log(rowSelected)
            setShowModal(!hideModal);
            setTitleModal(title)
        }
        
        
    }

    const elemtAction = action.map((item,index) => {
        return (
            <ItemOption 
            key={index}
            item={item} 
            content={item.title}
             nameIcon={item.nameIcon}
             showModal={showModal}
             setMethod={setMethod}
            >

            </ItemOption>
        )
    })
    const elemtStatus = status.map((item,index) => {
        return (
            <ItemOption key={index} content={item.status} squareShape={item.color}>

            </ItemOption>
        )
    })
    const handleOnchange = (e) => {
            const value = e.target.value;
            setData({
              ...data,
              [e.target.name]: value
            });
          
    }

    const handleOnchangeSelect = (name, value) => {
        setData({
            ...data,
            [name]: value
          });
    }

    const handleSubmit = () => {
        console.log(data);
    }
    const handleCancel = () => {

    }
    return (
        <div className="manipulation">
            <div>
                {elemtAction}
            </div>
            <div style={{ alignItems : 'center'}}>
                {elemtStatus}
            </div>
            <Modal 
                visible={hideModal} 
                setVisible={setShowModal}
                title = {titleModal} 
                handleSubmit = {handleSubmit}
                setMethod={setMethod}
                bodyModal = {
                    method == "Add" ?
                     <BodyModal data={{}} handleOnchange={handleOnchange} handleOnchangeSelect={handleOnchangeSelect}/>
                     : 
                     method == "Modified" 
                     ?
                     <BodyModal data={data} handleOnchange={handleOnchange} handleOnchangeSelect={handleOnchangeSelect}/> 
                     :
                     <BodyModal data={data} handleOnchange={handleOnchange} handleOnchangeSelect={handleOnchangeSelect}/>
                
                
            }

            />
        </div>
    );
}

export default Manipulation;
