import React, {useState, useEffect, useRef} from 'react'
import { Form, Input, InputNumber,Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import '../../assets/styles/molecules/Form.scss'
const { Option } = Select;
import { useSelector, useDispatch } from 'react-redux'
import { data } from 'jquery';
import { fromPairs } from 'lodash';
import LocsApi from '../api/LocsApi'

import PackageApi from '../api/PackageApi'
FormTest.defaultProps = {
  productCodeData : ['GD', 'HCCS'],
  productCode : ['GD']
}



const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 18,
        offset: 0,
      },
    },
  };
  const tailFromSelect = {
    wrapperCol: {
      xs: {
        span: 4,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 6,
      },
    },
  }
export default function FormTest (props){
    const {inputRef, onSubmit, onSubmitFailed, form, productCodeData, dataModal} = props;

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );
    const [productCodes, setProductCodes] = useState([]);
    const [packageProductCode, setPackageProductCode] = useState(productCodes[0]);
  

    const handleProductCodeChange = value => {
    //   PackageApi.get(
    //     value, 
    //     (res) => {
    //       let result = res.data.map(a => a.packageProductCode);
    //       setProductCodes(result)
    //       setPackageProductCode(result[0])
    //       form.setFieldsValue({
    //         packageProductCode : result[0],
    //       })
    //     },(err) => {
    //         console.log(err);
    //     }
    //     )

    };
  
    const onPackageProductCodeChange = value => {
      setPackageProductCode(value);
    };
    // call api l???y danh s??ch m?? g??i s???n ph???m
    // useEffect(() => {
    //   PackageApi.get(
    //     productCodeData[0], 
    //     async (res) => {
    //       let result = res.data.map(a => a.packageProductCode);
    //       setProductCodes(result)
    //       setPackageProductCode(result[0])
    //       await form.setFieldsValue({
    //         packageProductCode : result[0],
    //       })
          
    //     },(err) => {
    //         console.log(err);
    //     }
    //     )
    // },[])
/////////////////////
    const [locationName, setLocationName] = useState("Vi???t Nam")
    const [citys, setCity] = useState([])
    useEffect(() => {
        LocsApi.getCity(1,
            async (res) => {
                let result = res.data.map(a => a.locationName);
                setCity(result)
            },
            (err) => {}
            )
    },[])


/////////////////////

    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        initialValues={{...dataModal, productCode :  productCodeData[0] , packageProductCode : productCodes[0] }}
        scrollToFirstError
      >
        <div
          style={{display : "flex"}}
        >
                <Form.Item
                  name="productCode"
                  label="M?? s???n ph???m"
                  {...tailFromSelect}
                >
                  <Select  style={{ width: 120 }} onChange={handleProductCodeChange} >
                    {productCodeData.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="packageProductCode"
                  label="M?? g??i s???n ph???m"
                  {...tailFromSelect}
                  initialValue={packageProductCode}
                >
                  <Select style={{ width: 120 }} defaultValue={packageProductCode} onChange={onPackageProductCodeChange}>
                    {productCodes.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
        
        </div>
        
        <Form.Item
          name="contactEmailAddress"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Email nh???p sai ?????nh d???ng!',
            },
            {
              required: true,
              message: 'Tr?????ng n??y b???t bu???c nh???p!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contactName"
          label="T??n ng?????i li??n h???"
          rules={[
            {
              required: false,
              message: 'H??y nh???p t??n ng?????i li??n h???!',
              whitespace: true,
            }
            // ,
            // ({ getFieldValue }) => ({
            //   validator(_, value) {
            //     console.log("Value Email ", getFieldValue('email'))
            //     if (!value || getFieldValue('email') === value) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(new Error('The two passwords that you entered do not match!'));
            //   },
            // })
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contactPhoneNumber"
          label="S??? ??i???n tho???i"
          rules={[
            {
              required: true,
              message: 'Tr?????ng n??y b???t bu???c nh???p!',
              whitespace: false
            }

          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          name="nameProjectSales"
          label="T??n d??? ??n b??n h??ng"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="numberContract"
          label="S??? h???p ?????ng"
          rules={[
            {
              type : "string",
              pattern : /^[0-9]+$/,
              message: 'Ch??? ???????c ph??p nh???p s???',
              whitespace: false
            }

          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="money"
          label="S??? ti???n"
          
        >
          <InputNumber  min={0} max={10000000000000} />
        </Form.Item>
        <Form.Item
          name="contractName"
          label="T??n h???p ?????ng"
          
        >
          <Input  />
        </Form.Item>
        <Form.Item
          name="codeProjectSales"
          label="M?? d??? ??n b??n h??ng"
        >
          <Input  />
        </Form.Item>

        <Form.Item
            name="locationName"
            label="Qu???c gia"

        >
            <Select   showSearch>
            {productCodeData.map(item => (
                <Option key={item}>{item}</Option>
            ))}
            </Select>
        </Form.Item>
        <Form.Item
            name="city"
            label="Th??nh ph???"

        >
            <Select   showSearch>
            {citys.map(item => (
                <Option key={item}>{item}</Option>
            ))}
            </Select>
        </Form.Item>
                
               
        <div style={{display : "none"}}>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" ref={inputRef}>
              Sumbit
            </Button>
          </Form.Item>
        </div>
        
      </Form>
    );
}
