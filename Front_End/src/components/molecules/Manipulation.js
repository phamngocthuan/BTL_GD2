import React, { useEffect, useState } from 'react';
import '../../assets/styles/molecules/Manipulation.scss'
import ItemOption from '../atomics/ItemOption'
import Modal from '../molecules/Modal'
import BodyModal from '../atomics/BodyModal'
import { useSelector, useDispatch } from 'react-redux'
import {setDataShow , setTitleModal, setMethodModal, setShowModal} from '../../redux/action/index'
Manipulation.propTypes = {

};
const action = [
    {title: "Thêm yêu cầu", nameIcon: "Pointer", state : "Add", content : "Thêm yêu cầu"},
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

    const dataShow = useSelector(state => state.homepage.dataShow);

    const titleModal = useSelector(state => state.modal.title);
    const isShowModal = useSelector(state => state.modal.isShow);
    const methodModal = useSelector(state => state.modal.method);


    const dispatch = useDispatch(); 

    const showModal = (title, state) => {
        const obj = {
            isShow : !isShowModal,
            title : isShowModal ? "" : title,
            method : isShowModal ? "" : state
        }
        dispatch(setTitleModal({title : obj.title}))
        dispatch(setMethodModal({method : obj.method}))
        dispatch(setShowModal({isShowModal : obj.isShow}))

        
    }

    const elemtAction = action.map((item,index) => {
        return (
            <ItemOption 
            key={index}
            item={item} 
            content={item.title}
            nameIcon={item.nameIcon}
            showModal={isShowModal}
            >

            </ItemOption>
        )
    })
    // Hiển thị màu
    const elemtStatus = status.map((item,index) => {
        return (
            <ItemOption key={index} content={item.status} squareShape={item.color}>

            </ItemOption>
        )
    })
   

    const handleSubmit = () => {
        dispatch(setTitleModal({title : ""}))
        dispatch(setMethodModal({method : "Add"}))
        dispatch(setShowModal({isShowModal : false}))
        dispatch(setDataShow({
            codeRequired : '',
            codeProjectSales : '',
            nameProjectSales : '',
            numberContract : '',
            productCode : '',
            createdDate : '',
            packageProductCode : '',
        }));
    }
    const handleCancel = () => {
        dispatch(setDataShow({
            codeRequired : '',
            codeProjectSales : '',
            nameProjectSales : '',
            numberContract : '',
            productCode : '',
            createdDate : '',
            packageProductCode : '',
        }));
        dispatch(setTitleModal({title : ""}))
        dispatch(setMethodModal({method : "Add"}))
        dispatch(setShowModal({isShowModal : false}))
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
                visible={isShowModal} 
                title = {titleModal} 
                handleSubmit = {handleSubmit}
                handleCancel={handleCancel}
                bodyModal = {
                    <BodyModal  />
            }

            />
        </div>
    );
}

export default Manipulation;
