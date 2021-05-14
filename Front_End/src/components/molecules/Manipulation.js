import React, { useEffect, useState } from 'react';
import '../../assets/styles/molecules/Manipulation.scss'
import ItemOption from '../atomics/ItemOption'
import Modal from '../molecules/Modal'
import BodyModal from '../atomics/BodyModal'
import { useSelector, useDispatch } from 'react-redux'
import ContractApi from '../api/ContractApi'
import Notification from '../atomics/Notification'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form } from 'antd'
import {setDataShow , setTitleModal, setMethodModal, setShowModal, setDataModal, setIndexSelectedTable} from '../../redux/action/index'
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
    const [form] = Form.useForm();
    const indexSelected = useSelector(state => state.table.indexSelected);
    const dataSelected = useSelector(state => state.table.dataSelected);

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

    const  showModal =  async  (title, state) => {
        const obj = {
            isShow : !isShowModal,
            title : isShowModal ? "" : title,
            method : isShowModal ? "" : state
        }
        const a = {
            codeRequired : '',
            codeProjectSales : '',
            nameProjectSales : '',
            numberContract : '',
            productCode : '',
            createdDate : '',
            packageProductCode : '',
        }
        
        if(state === "Add"){
            await form.resetFields();
            setInstance({})
            dispatch(setDataModal({data : a}))
            dispatch(setTitleModal({title : obj.title}))
            dispatch(setMethodModal({method : obj.method}))
            dispatch(setShowModal({isShow : obj.isShow}))
        }
        else {
            if(indexSelected < 0){
                Notification("error","Lỗi","Chưa chọn bản ghi")
            }else {
                    ContractApi.getByCode(dataSelected.codeRequired, async (res) => {
                        await setInstance(res.data.data)
                        form.setFieldsValue(res.data.data)
                        dispatch(setDataModal({data : res.data.data}))
                        dispatch(setTitleModal({title : obj.title}))
                        dispatch(setMethodModal({method : obj.method}))
                        dispatch(setShowModal({isShow : obj.isShow}))
                    },(err) => {
                        Notification("error","Lỗi","Lỗi mạng")
                    })
            }
        }
        
    }
    const handleDelete = async () => {
        await  ContractApi.getByCode(dataSelected.codeRequired,(res) => {
             ContractApi.delete(res.data.data.contractID, 
                (res) => {
                    Notification("success","Thành công", "Xóa thành công");
    
                },(err) => {
                    Notification("error","Lỗi", "Xóa thất bại")
                }
                )
        },(err) => {
            Notification("error","Lỗi","Lỗi mạng")
        })
        
    }
    ///Hiên thị khi click vào xóa
    function showPromiseConfirm() {
        if(indexSelected < 0){
            Notification("error","Lỗi","Chưa chọn bản ghi")
        }else 

            confirm({
                title: 'Bạn có chắc chắn muốn xóa bản ghi có mã yêu cầu dưới đây hay không ?',
                icon: <ExclamationCircleOutlined />,
                content: `Mã yêu cầu : ${dataModal.codeRequired}`,
                onOk() {
                    return new Promise((resolve, reject) => {
                        handleDelete();
                        dispatch(setIndexSelectedTable({indexSelected : -1}));
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    }).catch(() => console.log('Oops errors!'));
                    
                },
                onCancel() {
                    dispatch(setIndexSelectedTable({indexSelected : -1}))  
                },
                okText : "Xóa",
                cancelText: "Hủy"
            });
    }

    /// Hiển thị các action method
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
   

    const handleSubmit = (obj) => {
        if(methodModal === "Add")
            ContractApi.post(
                obj, 
                (res) => {
                    Notification("success","Thành công", "Thêm thành công");

                },(err) => {
                    Notification("error","Lỗi", "Thêm thất bại")
                }
                
                )
        if(methodModal === "Modified")
            ContractApi.update(
                obj.contractID,
                obj, 
                (res) => {
                    Notification("success","Thành công", "Sửa thành công");

                },(err) => {
                    Notification("error","Lỗi", "Sửa thất bại")
                }
                
                )
        dispatch(setTitleModal({title : ""}))
        dispatch(setMethodModal({method : "Add"}))
        dispatch(setShowModal({isShowModal : false}))
        dispatch(setIndexSelectedTable({indexSelected : -1}))
    }
    const  handleCancel = async  () => {
        await setInstance({
            codeRequired : '',
            codeProjectSales : '',
            nameProjectSales : '',
            numberContract : '',
            productCode : '',
            createdDate : '',
            packageProductCode : '',
        })
        //Reset lại Modal
        dispatch(setTitleModal({title : ""}))
        dispatch(setShowModal({isShowModal : false}))
        dispatch(setIndexSelectedTable({indexSelected : -1}))
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
                instance = {instance}
                form={form}
                bodyModal = {
                    <BodyModal  />
            }

            />
        </div>
    );
}

export default Manipulation;
