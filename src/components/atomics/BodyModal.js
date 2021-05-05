import React, {  } from 'react';
import '../../assets/styles/atomics/BodyModal.scss'
import Select from '../atomics/Select'

BodyModal.propTypes = {

};

function BodyModal(props) {
   
    return (
        <div class='body-modal' >
            <div className="body-modal-top">
                <div>
                    <span style={{ paddingRight: '5px'}}>Sản phẩm</span>
                    <Select />
                </div>
                <div>
                    <span style={{ paddingRight: '5px'}}>Loại yêu cầu</span>
                    <Select />
                </div>
                <div>
                    <span style={{ paddingRight: '5px'}}>Gói sản phẩm</span>
                    <Select />
                </div>
                
            </div>
            <div className="body-modal-bottom">
                <div class="form-body">
                    <div className="item-form-body">
                        <div className="fb-left"> Số tiền</div>
                        <div className="fb-right"><input /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyModal;
