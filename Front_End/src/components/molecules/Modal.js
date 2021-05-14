import 'antd/dist/antd.css';

import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import React, {useEffect, useRef, useState} from 'react'
import '../../assets/styles/molecules/Modal.scss'
import ValidateForm from '../molecules/Form'
import { Form } from 'antd'
import ButtonIcon from '../atomics/Button'

import ProductApi from '../api/ProductApi'

import _ from 'lodash';

export default function ModalDraggable(props)  {
  

  const {visible,  title, method, bodyModal, handleSubmit, setMethod, handleCancel, instance, form} = props;
  const [disabled, setDisable] = useState(false);
  const [productCodeData, setProductCodeData] = useState([])

  const inputRef = useRef(null)
  const [bounds, setBounds] = useState(
    { left: 0, top: 0, bottom: 0, right: 0 }
  )
  const draggleRef = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (obj) => {
    setBounds( { left: 0, top: 0, bottom: 0, right: 0 })
    handleSubmit(obj);
  };

  const clickCancel = e => {
    form.resetFields();
    setBounds( { left: 0, top: 0, bottom: 0, right: 0 })
    handleCancel();
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      }
    );
  };

  const onSubmit = (obj) => {
    console.log('Received values of form: ', obj);
    form.resetFields();
    const newObj = {...obj, ...instance};
    handleOk(newObj);
  }
  const onSubmitFailed = (values, errorFields, outOfDate) => {
    console.log(values, " ", errorFields, " ",outOfDate )
  }
  const onOk = () => {
    inputRef.current.click();
  }
  const onCancel = () => {
    clickCancel();
  }
  useEffect(()=> {
    ProductApi.getCodes(
      (res) => {
        setProductCodeData(res.data);
      },(err) => {
          console.log(err);
      }
    )
    return () => {}
  },[])


    return (
      <>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                    setDisable({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                setDisable({
                  disabled: true,
                });
              }}
                onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              {title}
            </div>
          }
          visible={visible}
          onCancel={ () => {onCancel()}}
          modalRender={modal => (
            <Draggable
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
          maskClosable={false}
          footer={[
            <ButtonIcon 
                key="submit" 
                type="type-2" 
                name={"IconDone"}
                title="Lưu"
                onClick={onOk}
            />
            ,
            <ButtonIcon 
                type="type-1"
                name={"IconCancel"}
                key="cancel"
                title="Hủy"
                onClick={onCancel}
            />
            
        ]}
        >
          <ValidateForm 
            form={form}
            onSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
            inputRef={inputRef}
            productCodeData={productCodeData}
            dataModal={instance}
          />
        </Modal>
      </>
    );
  
}
