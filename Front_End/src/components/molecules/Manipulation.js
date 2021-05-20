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
import { getStatus} from '../../constants/CommonFunction'
import {setDataShow , setLoadData, setTitleModal, setMethodModal, setShowModal, setDataModal, setIndexSelectedTable} from '../../redux/action/index'
Manipulation.propTypes = {

};
const action = [
    {title: "Thêm yêu cầu", nameIcon: "Pointer", state : "Add", content : "Thêm yêu cầu"},
    {title: "Sửa", nameIcon: "IconModify", state : "Modified", content : "Sửa"},
    {title: "Xóa", nameIcon: "IconDelete", state : "Delete", content : "Xóa"},
    {title: "Gửi yêu cầu", nameIcon : "IconSend" , state : "Sending", content : "Gửi yêu cầu"}
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
    const statusTable = useSelector(state => state.table.status)

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

    /**
     * Hàm hiển thị Modal
     * @param {*} title Tilte
     * @param {*} state Trạng thái : thêm , sửa, xóa
     */
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
            dispatch(setDataModal({data : {}}))
            dispatch(setTitleModal({title : obj.title}))
            dispatch(setMethodModal({method : obj.method}))
            dispatch(setShowModal({isShow : obj.isShow}))
        }
        else {
                if(dataSelected.length < 1){
                    Notification("error","Lỗi","Chưa chọn bản ghi")
                }else if(statusTable  === "UNSENT" && state === "Sending" && dataSelected.length > 0  ){
                    var codes = dataSelected.map((item) => item.codeRequired.toString())
                    const response = await ContractApi.sendRequest(codes,0);
                    if(response.success){
                            Notification("success", "Thành công", response.message[0])
                            dispatch(setLoadData({loadData : true}))
                    }else {
                        Notification("error","Lỗi", response.message[0])
                    }
                    
                }
                 else
                if(dataSelected.length > 1){
                    Notification("error", "Lỗi", "Chỉ được sửa một bản ghi")
                }
                else 
                {
                    /// PENDING
                    if (statusTable === "PENDING"){
                        if(state === "Sending" ){
                            Notification('error',"Lỗi", "Bản ghi đã được gửi yêu cầu")
                        }else{
                           
                            let response = await ContractApi.getByCode(dataSelected[0].codeRequired);
                            if( response.success){
                                setInstance(response.data)
                                form.setFieldsValue(response.data)
                                dispatch(setDataModal({data : response.data}))
                                dispatch(setTitleModal({title : obj.title}))
                                dispatch(setMethodModal({method : obj.method}))
                                dispatch(setShowModal({isShow : obj.isShow}))
                            }else {
                                Notification("error","Lỗi",response.message[0])
                            }
                            
                        }
                    }
                    else
                    // APPROVED
                    if (statusTable === "APPROVED"){
                        switch (state) {
                            case "Sending":
                                Notification('error',"Lỗi", "Bản ghi đã được ghi nhận")
                                break;
                            case "Modified":
                                Notification('error',"Lỗi", "Bản ghi đã được ghi nhận")
                                break;
                        }
                    }
                    else
                    //REFUSE
                    if (statusTable === "REFUSE"){
                        switch (state) {
                            case "Sending":
                                Notification('error',"Lỗi", "Bản ghi đã bị từ chối không được phép gửi tiếp")
                                break;
                            case "Modified":
                                Notification('error',"Lỗi", "Bản ghi đã bị từ chối không được phép sửa")
                                break;
                        }
                    }
                    else
                    // UNSENT
                    if(statusTable  === "UNSENT"){
                        switch(state) {

                            case "Modified" : 
                                let response = await ContractApi.getByCode(dataSelected[0].codeRequired);
                                if(response.success){
                                    await setInstance(response.data)
                                    form.setFieldsValue(response.data)
                                    dispatch(setDataModal({data : response.data}))
                                    dispatch(setTitleModal({title : obj.title}))
                                    dispatch(setMethodModal({method : obj.method}))
                                    dispatch(setShowModal({isShow : obj.isShow}))
                                }else {
                                    Notification("error","Lỗi",response.message[0])
                                }
                                
                                break;
                        }
                        
                    }

                    
            }
            
        }
        
    }

    /**
     * Hàm click Xóa
     * @author pnthuan(15/5/2021)
     */
    const handleDelete = async () => {
            var codes = dataSelected.map((item) => item.codeRequired.toString());
            let response = await ContractApi.delete(codes);
            if(response.success){
                    Notification("success","Thành công", response.message[0]);
                    dispatch(setLoadData({loadData : true}))
            }else {
                Notification("error","Lỗi", response.message[0])
            }    
        
    }
    ///Hiên thị khi click vào xóa
    function showPromiseConfirm(title, state) {
        if (statusTable === "APPROVED"){
            switch (state) {
                case "Delete" : 
                    Notification('error',"Lỗi", "Bản ghi đã được ghi nhận không được phép xóa");
                    break;
            }
        }else {
            if(indexSelected.length < 1){
                Notification("error","Lỗi","Chưa chọn bản ghi")
            }else {
                let arr = dataSelected.map((item) => item.codeRequired);
                confirm({
                    title: 'Bạn có chắc chắn muốn xóa bản ghi có mã yêu cầu dưới đây hay không ?',
                    icon: <ExclamationCircleOutlined />,
                    content: `Mã yêu cầu : ${arr.toString()}`,
                    onOk() {
                        return new Promise((resolve, reject) => {
                             handleDelete();
                            // dispatch(setIndexSelectedTable({indexSelected : -1}));
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                        }).catch(() => console.log('Oops errors!'));
                        
                    },
                    onCancel() {
                        
                    },
                    okText : "Xóa",
                    cancelText: "Hủy"
                });
            }
    
                
        }
        
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
   

    /**
     * Hàm submit form
     * @param {*} obj 
     * @author pnthuan(17/5/2021)
     */
    const handleSubmit = async (obj) => {
        dispatch(setShowModal({isShowModal : false}))
        
        if(methodModal === "Add"){
            let response = await ContractApi.post(obj);
            if(response.success){
                Notification("success","Thành công", response.message[0]);
                dispatch(setLoadData({loadData : true})) 
            }else {
                Notification("error","Lỗi", response.message[0])
            }
        }
            
        if(methodModal === "Modified")
        {
            let response = await ContractApi.update(obj.contractID, obj);
            if(response.success){
                    Notification("success","Thành công", response.message[0]);
                    dispatch(setLoadData({loadData : true}))
            }else {
                Notification("error","Lỗi", response.message[0])
            }
        }
        setInstance({})
        dispatch(setTitleModal({title : ""}))
        dispatch(setMethodModal({method : "Add"}))
        
        // dispatch(setIndexSelectedTable({indexSelected : -1}))
    }

    /**
     * Hàm click Hủy thao tác : thêm , sửa , xóa
     * @author pnthuan(19/5/2021)
     */
    const  handleCancel =   () => {
        setInstance({})
        //Reset lại Modal
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
