import React, { useEffect, useState } from 'react';
import '../../assets/styles/molecules/Manipulation.scss'
import ItemOption from '../atomics/ItemOption'
import Modal from '../molecules/Modal'
import BodyModal from '../atomics/BodyModal'
import { useSelector, useDispatch } from 'react-redux'
import ContractApi from '../api/ContractApi'
import Notification from '../atomics/Notification'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {setDataShow , setTitleModal, setMethodModal, setShowModal, setDataModal} from '../../redux/action/index'
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
import { Modal as modalAnt } from 'antd';
const { confirm } = modalAnt;

function Manipulation(props) {

    const indexSelected = useSelector(state => state.table.indexSelected);

    const titleModal = useSelector(state => state.modal.title);
    const isShowModal = useSelector(state => state.modal.isShow);
    const methodModal = useSelector(state => state.modal.method);
    const dataModal = useSelector(state => state.modal.data);
    const [instance,setInstance] = useState({
        codeRequired : '',
        codeProjectSales : '',
        nameProjectSales : '',
        numberContract : '',
        productCode : '',
        createdDate : '',
        packageProductCode : '',
    })


    const dispatch = useDispatch(); 

    const showModal = (title, state) => {
        

        if(indexSelected < 0 && state != "Add"){
            Notification("error","Lỗi","Chưa chọn bản ghi")
        }else {
            const obj = {
                isShow : !isShowModal,
                title : isShowModal ? "" : title,
                method : isShowModal ? "" : state
            }

            dispatch(setTitleModal({title : obj.title}))
            dispatch(setMethodModal({method : obj.method}))
            dispatch(setShowModal({isShow : obj.isShow}))
            if(methodModal === "Add")
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
        
    }

    function showPromiseConfirm() {
        confirm({
          title: 'Bạn có chắc chắn muốn xóa bản ghi có mã yêu cầu dưới đây hay không ?',
          icon: <ExclamationCircleOutlined />,
          content: `Mã yêu cầu : ${dataModal.codeRequired}`,
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
    }

    const elemtAction = action.map((item,index) => {
        var func = showModal;
        if(item.state === "Delete"){
            func = showPromiseConfirm;
        }
        return (
            <ItemOption 
            key={index}
            item={item} 
            content={item.title}
            nameIcon={item.nameIcon}
            onClick={func}
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
        // ContractApi.post(
        //     dataModal, 
        //     (res) => {
        //         Notification("success");

        //     },(err) => {
        //         Notification("error")
        //     }
            
        //     )
        Notification("success","Thành công", "Thêm thành công");


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
        if(methodModal === "Add")
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
