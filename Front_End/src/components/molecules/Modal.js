import 'antd/dist/antd.css';

import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import React, {useRef, useState} from 'react'
import '../../assets/styles/molecules/Modal.scss'

export default function ModalDraggable(props)  {

  const {visible, setVisible, title, method, bodyModal} = props;
  const [disabled, setDisable] = useState(false);
  const [bounds, setBounds] = useState(
    { left: 0, top: 0, bottom: 0, right: 0 }
  )
  const draggleRef = useRef(null);

  const showModal = () => {
    console.log('showmodal')
    setVisible(true);
  };

  const handleOk = e => {
    console.log('Ok')
    setVisible(false);
    setBounds( { left: 0, top: 0, bottom: 0, right: 0 })
  };

  const handleCancel = e => {
    console.log('cancle')
    setVisible(false);
    setBounds( { left: 0, top: 0, bottom: 0, right: 0 })
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
          onOk={ () => {handleOk()}}
          onCancel={ () => {handleCancel()}}
          modalRender={modal => (
            <Draggable
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
          maskClosable={false}
        >
          {bodyModal}
        </Modal>
      </>
    );
  
}

