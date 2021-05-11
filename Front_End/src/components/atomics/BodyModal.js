import React, {  } from 'react';
import '../../assets/styles/atomics/BodyModal.scss'
import Select from '../atomics/Select'
import {getProductCode, getPackageProduct} from '../../constants/CommonFunction'
import {TYPEREQUEST} from '../../constants/Enum'
import { useSelector, useDispatch } from 'react-redux'
import {setDataShow} from '../../redux/action/index'
BodyModal.propTypes = {

};
BodyModal.defaultProps = {

}
function BodyModal(props) {
    
   const data = useSelector(state => state.homepage.dataShow);
   const dispatch = useDispatch(); 

   const handleOnchange = (e) => {
        const value = e.target.value;
        const obj = {...data, [e.target.name]: value};

        dispatch(setDataShow(obj));
    
    }

    const handleOnchangeSelect = (name, value) => {
        const obj = {...data, [name]: value};

        dispatch(setDataShow(obj));
    }

   const packageProduct = getPackageProduct(data.ProductCode);

    return (
        <div class='body-modal' >
            <div className="body-modal-top">
                <div>
                    <span style={{ paddingRight: '5px'}}>Sản phẩm</span>
                    <Select valueDefault={data.ProductCode}
                        data = {getProductCode()}
                        name={'productCode'}
                        handleOnchange={handleOnchange}
                        handleOnchangeSelect={handleOnchangeSelect}
                    />
                </div>
                <div>
                    <span style={{ paddingRight: '5px'}}>Loại yêu cầu</span>
                    <Select dataEnum={TYPEREQUEST}
                        handleOnchangeSelect={handleOnchangeSelect}
                        name={'typeRequest'}
                    />
                </div>
                {
                    packageProduct.length > 0 && 
                    <div>
                        <span style={{ paddingRight: '5px'}}>Gói sản phẩm</span>
                        <Select data={packageProduct}
                            valueDefault ={packageProduct[0].ProductCode}
                            handleOnchange={handleOnchange}
                            name={'packageProductCode'}
                            handleOnchangeSelect={handleOnchangeSelect}
                        />
                    </div>

                }
                
                
            </div>
            <div className="body-modal-bottom">
                <div class="form-body">
                    <div className="item-form-body">
                        <div className="fb-left"> Mã yêu cầu </div>
                        <div className="fb-right"><input name="codeRequired" value={data.codeRequired} onChange={handleOnchange}/></div>
                    </div>
                    <div className="item-form-body">
                        <div className="fb-left"> Mã dự án bán hàng</div>
                        <div className="fb-right"><input name="codeProjectSales" value={data.codeProjectSales} onChange={handleOnchange}/></div>
                    </div>
                    <div className="item-form-body">
                        <div className="fb-left"> Tên dự án bán hàng </div>
                        <div className="fb-right"><input name="nameProjectSales" value={data.nameProjectSales} onChange={handleOnchange}/></div>
                    </div>
                    <div className="item-form-body">
                        <div className="fb-left"> Số hợp đồng</div>
                        <div className="fb-right"><input name="numberContract" value={data.numberContract}
                            onChange={handleOnchange}
                        /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyModal;
