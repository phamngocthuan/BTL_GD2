import React, {useState, useRef} from 'react'
import { Form, Input, InputNumber,Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import '../../assets/styles/molecules/Form.scss'
const { Option } = Select;
import { useSelector, useDispatch } from 'react-redux'
import { data } from 'jquery';
import { fromPairs } from 'lodash';



const productCodeData = ['QLNS', 'HTNS'];
const packageProductCodeData = {
  QLNS: ['QLNS.A', 'QLNS.B', 'QLNS.C'],
  HTNS: ['HTNS.D', 'HTNS.E', 'HTNS.F'],
};
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
        offset: 6,
      },
    },
  };
export default function ValidateForm (props){
    const {inputRef, onSubmit, onSubmitFailed, form} = props;
    const dataModal = useSelector(state => state.modal.data);

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
    const [productCodes, setProductCodes] = useState(packageProductCodeData[productCodeData[0]]);
    const [packageProductCode, setPackageProductCode] = useState(packageProductCodeData[productCodeData[0]][0]);
  
    const handleProductCodeChange = value => {
      setProductCodes(packageProductCodeData[value]);
      setPackageProductCode(packageProductCodeData[value][0]);
    };
  
    const onPackageProductCodeChange = value => {
      setPackageProductCode(value);
    };
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        initialValues={{...dataModal}}
        scrollToFirstError
      >
        <div
          style={{display : "flex"}}
        >
                <Form.Item
                  name="productCode"
                  label="Mã sản phẩm"

                >
                  <Select defaultValue={productCodeData[0]} style={{ width: 120 }} onChange={handleProductCodeChange}>
                    {productCodeData.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="packageProductCode"
                  label="Mã gói sản phẩm"
                >
                  <Select style={{ width: 120 }} value={packageProductCode} onChange={onPackageProductCodeChange}>
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
              message: 'Email nhập sai định dạng!',
            },
            {
              required: true,
              message: 'Trường này bắt buộc nhập!',
            },
          ]}
        >
          <Input defaultValue={dataModal.contactEmailAddress ? dataModal.contactEmailAddress : ""}/>
        </Form.Item>
        <Form.Item
          name="contactName"
          label="Tên người liên hệ"
          rules={[
            {
              required: false,
              message: 'Hãy nhập tên người liên hệ!',
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
          <Input defaultValue={dataModal.contactName ? dataModal.contactName : ""}/>
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Trường này bắt buộc nhập!',
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
          label="Tên dự án bán hàng"
        >
          <Input defaultValue={dataModal.nameProjectSales ? dataModal.nameProjectSales : ""}/>
        </Form.Item>
        <Form.Item
          name="numberContract"
          label="Số hợp đồng"
          rules={[
            {
              type : "string",
              pattern : /^[0-9]+$/,
              message: 'Chỉ được phép nhập số',
              whitespace: false
            }

          ]}
        >
          <Input defaultValue={dataModal.numberContract}/>
        </Form.Item>
        <Form.Item
          name="money"
          label="Số tiền"
          
        >
          <InputNumber  min={0} max={10000000000000} />
        </Form.Item>
        <Form.Item
          name="contractName"
          label="Tên hợp đồng"
          
        >
          <Input defaultValue={dataModal.contractName ? dataModal.contractName : ""} />
        </Form.Item>
        <Form.Item
          name="codeProjectSales"
          label="Mã dự án bán hàng"
        >
          <Input defaultValue={dataModal.codeProjectSales} />
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
