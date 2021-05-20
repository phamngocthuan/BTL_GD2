import 'antd/dist/antd.css';

import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import React, {useEffect, useRef, useState, useCallback} from 'react'
import '../../assets/styles/molecules/Modal.scss'
import ValidateForm from '../molecules/Form'
import ButtonIcon from '../atomics/Button'
import ProductApi from '../api/ProductApi'
import LocsApi from '../api/LocsApi'
import _ from 'lodash';

/**
 * Component Modal , có chức năng kéo thả
 * @param {*} props 
 * @returns 
 * @author pnthuan (19/5/2021)
 */
export default function ModalDraggable(props)  {
  //#region State


  //#endregion

  const {visible,  title, method, bodyModal, handleSubmit, setMethod, handleCancel, instance, form} = props;
  const [disable, setDisable] = useState(true);
  const [productCodeData, setProductCodeData] = useState([])
  const [dataCity, setDataCity] = useState([])
  const inputRef = useRef(null)
  const [bounds, setBounds] = useState(
    { left: 0, top: 0, bottom: 0, right: 0 }
  )
  const draggleRef = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  // Submit
  const handleOk = (obj) => {
    setBounds( { left: 0, top: 0, bottom: 0, right: 0 })
    handleSubmit(obj);
  };

  // Click Hủy , reset lại vị trí
  const clickCancel =  (e) => {
    form.resetFields();
    setBounds( { left: 0, top: 0, bottom: 0, right: 0 })
    handleCancel();
  };

  // Xử lý sự kiện kéo thả modal
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


  // onSubmit , reset data của modal
  const onSubmit =  (obj) => {
    form.resetFields();
    const newObj = {...instance, ...obj};
    handleOk(newObj);
  }

  // 
  const onSubmitFailed = (values, errorFields, outOfDate) => {
    console.log(values, " ", errorFields, " ",outOfDate )
  }


  const onOk = () => {
    inputRef.current.click();
  }
  const onCancel = () => {
    clickCancel();
  }
  // fetch product code
  const fetchCode = useCallback(async () => {
    const response = await ProductApi.getCodes();
    if(response.success){
      setProductCodeData(response.data);
    }
  }, [])
  // hàm chạy 1 lần duy nhất lấy mã sản phẩm
  useEffect(()=> {
    fetchCode();
  },[fetchCode])


 
  // Lấy data  về city khi thêm mới
  useEffect(() => {
      LocsApi.getCity(1,
          async (res) => {
              let result = res.data.map(a => a.locationName);
              setDataCity(result)
          },
          (err) => {}
          )
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
                if (disable) {
                    setDisable(false);
                }
              }}
              onMouseOut={() => {
                setDisable(true);
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
              disabled={disable}
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
            dataCity={dataCity}
          />
        </Modal>
      </>
    );
  
}
