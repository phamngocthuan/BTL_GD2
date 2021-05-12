import React, { useState, useCallback , useRef } from 'react'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import 'antd/dist/antd.css'
import 'ant-design-draggable-modal/dist/index.css'
import '../../assets/styles/molecules/Modal.scss'
import '../../assets/styles/atomics/Checkbox.scss'
import Input from '../atomics/InputV2'
import Dropdown from './Dropdown'
import { useForm } from "react-hook-form";
import '../../assets/styles/atomics/Input.scss'
import '../../assets/styles/customs/antd-custom.scss'
import _ from "lodash/fp";
import Button from '../atomics/Button'
import { useTranslation } from 'react-i18next';
import Icon from '../atomics/Icon';
const listData = [
    "Danh sách nhân viên nghỉ việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên chính thức",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên thử việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
    "Danh sách nhân viên thôi việc",
]
/**
 * Component Form tạo liên hệ
 * @param {*} props 
 * @returns 
 * @author PNTHUAN (5/3/2021)
 */
const ModalWithButton = (props) => {
    const {visible, setVisible} = props;
    const [listCurrent,setListCurrent] = useState(null);
    const { t, i18n } = useTranslation();
    const inputRef = useRef(null);
    // data 
    const [fieldsData, setFieldsData] = useState([
        {name : 'FullName', value: '', require: true, maxLength : 20, pattern : null ,txtLabel : "Họ và tên"},
        {name : 'PhoneNumber', value: '', require: true, maxLength : 8, pattern : /[0-9]/, txtLabel : "Điện thoại"},
        {name : 'Email', value: '', require: true, maxLength : 50, pattern : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, txtLabel : "Email"},
    ])
    // state
    // click hủy
    const onCancel = useCallback(() => 
    {
        setListCurrent(null)
        setVisible(false)
        setAcceptSelect(false)
    }
    , []) 
    const [acceptSelect, setAcceptSelect] = useState(false) // click check box để hiện thị tab select danh sách
    const [data,setData]  = useState([...listData]);
    // const onOk = useCallback(() => setVisible(true), [])
    // Hook form
    const { register, handleSubmit,  errors } = useForm();

    // khi validate thành công và gửi về JSON
    const onSubmit = data => {
        data.listCurrent = listCurrent;
        alert(JSON.stringify(data));
        setVisible(false)
        setListCurrent(null)
        setAcceptSelect(false)
    };
    // click Save -> gọi đến hàm submit form  
    function btnSave (){
      inputRef.current.click();
      setAcceptSelect(false)
    }
     // Lọc data
     function filterData(keyWords) {
        if(keyWords){
            var list = [...data]
            list = listData.filter((item,index) => {
                return item.toLowerCase().indexOf(keyWords.trim().toLowerCase()) !== -1 ? item : "";
            })
            setData(list)
        }
    }
      // Click check nếu muốn hiển thị select
      function handDisplaySelect(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setAcceptSelect(value);
    }
    // element trả về các label + input 
    var elmtInput = fieldsData.map((item,index) => {
        return   <Input 
        key={index}
        register={register}
        errors={errors}
        data={item}
        />
    })
    // Hàm xử lý gắn giá trị cho danh sách hiện tại khi click
    // Set lại danh sách hiển thị
    function setListCurrentClick(value){
        setListCurrent(value);
        setData([...listData]);
    }
   
    return (
        <>
            
            <DraggableModal visible={visible} onCancel={onCancel } disabled={false}
                title="Tạo liên hệ"
                closeIcon={<Icon name="IconCloseSmall" fill='#fff' style={{marginTop: 14}} />}
                footer={[
                    <Button 
                        type="btn-type-1"
                        onClick={onCancel}
                        name={t('button:cancel')}
                        key="cancel"
                    />
                    ,  
                    <Button 
                        key="submit" 
                        type="primary" 
                        onClick={btnSave} 
                        name={t('button:create')}
                        type="btn-type-4"
                    />
                ]}
            >
                <div className="ant-modal-mask"></div>
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                >
                    { elmtInput }
                    <input className="none" type="submit" ref={inputRef} />
                    <div className="m-label lab-b ">
                        <label className="input-container">
                            <input type="checkbox" name='acceptSelect'  className="" onChange={handDisplaySelect}/>
                            <span className="checkmark">
                            </span>
                            Thêm vào danh sách có sẵn
                        </label>
                    </div>
                        <div className="m-control ">
                    </div>
                </form>
            </DraggableModal>
            
        </>
    )
}

function ModalV2(props) {
    const {visibleModal , setVisibleModal} = props;
    return (
        <DraggableModalProvider>
            <ModalWithButton visible={visibleModal} setVisible={setVisibleModal}/> 
        </DraggableModalProvider>
    )
    
}
export default ModalV2;