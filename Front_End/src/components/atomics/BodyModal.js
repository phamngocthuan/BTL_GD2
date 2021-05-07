import React, {  } from 'react';
import '../../assets/styles/atomics/BodyModal.scss'
import Select from '../atomics/Select'
import {getProductCode, getPackageProduct} from '../../constants/CommonFunction'
import {TYPEREQUEST} from '../../constants/Enum'

BodyModal.propTypes = {

};
BodyModal.defaultProps = {
    data: {ProductCode : 'QLNS'}
}
function BodyModal(props) {
   const {data, handleOnchange, handleOnchangeSelect} = props;
   const packageProduct = getPackageProduct(data.ProductCode);

    return (
        <div class='body-modal' >
            <div className="body-modal-top">
                <div>
                    <span style={{ paddingRight: '5px'}}>Sản phẩm</span>
                    <Select valueDefault={data.ProductCode}
                        data = {getProductCode()}
                        name={'ProductCode'}
                        handleOnchange={handleOnchange}
                        handleOnchangeSelect={handleOnchangeSelect}
                    />
                </div>
                <div>
                    <span style={{ paddingRight: '5px'}}>Loại yêu cầu</span>
                    <Select dataEnum={TYPEREQUEST}
                        handleOnchangeSelect={handleOnchangeSelect}
                        name={'TypeRequest'}
                    />
                </div>
                {
                    packageProduct.length > 0 && 
                    <div>
                        <span style={{ paddingRight: '5px'}}>Gói sản phẩm</span>
                        <Select data={packageProduct}
                            valueDefault ={packageProduct[0].ProductCode}
                            handleOnchange={handleOnchange}
                            name={'PackageProduct'}
                            handleOnchangeSelect={handleOnchangeSelect}
                        />
                    </div>

                }
                
                
            </div>
            <div className="body-modal-bottom">
                <div class="form-body">
                    <div className="item-form-body">
                        <div className="fb-left"> Mã yêu cầu </div>
                        <div className="fb-right"><input name="CodeRequired" value={data.CodeRequired} onChange={handleOnchange}/></div>
                    </div>
                    <div className="item-form-body">
                        <div className="fb-left"> Mã dự án bán hàng</div>
                        <div className="fb-right"><input name="CodeSale" value={data.CodeSale} onChange={handleOnchange}/></div>
                    </div>
                    <div className="item-form-body">
                        <div className="fb-left"> Tên dự án bán hàng </div>
                        <div className="fb-right"><input name="NameSale" value={data.NameSale} onChange={handleOnchange}/></div>
                    </div>
                    <div className="item-form-body">
                        <div className="fb-left"> Số hợp đồng </div>
                        <div className="fb-right"><input name="NumberContract" value={data.NumberContract}
                            onChange={handleOnchange}
                        /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyModal;
