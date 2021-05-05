import React, { useState } from 'react';
import '../../assets/styles/molecules/Manipulation.scss'
import ItemOption from '../atomics/ItemOption'
import Modal from '../molecules/Modal'
import BodyModal from '../atomics/BodyModal'
Manipulation.propTypes = {

};
const action = [
    {title: "Thêm", nameIcon: "Pointer", state : "Add", content : "Thêm yêu cầu"},
    {title: "Sửa", nameIcon: "IconModify", state : "Modified", content : "Sửa"},
    {title: "Xóa", nameIcon: "IconDelete", state : "Delete", content : "Xóa"},
    {title: "Nạp", nameIcon: "IconDownload", state : "", content : "Nạp"},
]
const status = [
    {status : 'Chưa gửi', color : '#007b00'},
    {status : 'Chờ duyệt', color : '#000000'},
    {status : 'Từ chối', color : '#ff0000'},
    {status : 'Đã duyệt', color : '#0000ff'},
]



function Manipulation(props) {

    const [hideModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('Thêm yêu cầu')

    const showModal = (title) => {
        setShowModal(!hideModal);
        setTitleModal(title)
    }

    const elemtAction = action.map((item,index) => {
        return (
            <ItemOption 
            key={index}
            item={item} 
            content={item.title}
             nameIcon={item.nameIcon}
             showModal={showModal}
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
    

    return (
        <div className="manipulation">
            <div>
                {elemtAction}
            </div>
            <div style={{ alignItems : 'center'}}>
                {elemtStatus}
            </div>
            <Modal visible={hideModal} setVisible={setShowModal}
                title = {titleModal} bodyModal = {<BodyModal />}
            />
        </div>
    );
}

export default Manipulation;
