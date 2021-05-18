import React, {useState, useEffect, useRef} from 'react'
import { Form, Input, InputNumber,Select,  Button } from 'antd';
import '../../assets/styles/molecules/Form.scss'
const { Option } = Select;
import { useSelector, useDispatch } from 'react-redux'
import { data } from 'jquery';
import { fromPairs } from 'lodash';

import PackageApi from '../api/PackageApi'
import LocsApi from '../api/LocsApi'
ValidateForm.defaultProps = {
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
        span: 6,
        offset: 6,
      },
      sm: {
        span: 6,
        offset: 6,
      },
    },
      labelCol: {
        xs: {
          span: 6,
        },
        sm: {
          span: 6,
        }
      }
  }
  const typeRequestData = [
    "Thay đổi thông tin", "Chỉnh sửa thông tin"
  ]
  const CityData = [
    "Hà Nội", "Hải Phòng", "TP Hồ Chí Minh"
  ]
export default function ValidateForm (props){
    const {inputRef, onSubmit, onSubmitFailed, form, productCodeData, dataModal, dataCity} = props;

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
    const [districtData, setDistrictData] = useState([])
    const [wardData, setWardData] = useState([])

    const [district, setDistrict] = useState("")
    const [city, setCity] = useState("")
    const [ward, setWard] = useState("")
  

    const handleProductCodeChange = value => {
      PackageApi.get(
        value, 
        (res) => {
          let result = res.data.map(a => a.packageProductCode);
          setProductCodes(result)
          setPackageProductCode(result[0])
          form.setFieldsValue({
            packageProductCode : result[0],
          })
        },(err) => {
            console.log(err);
        }
        )

    };
    
    const handleCityChange = value => {
      LocsApi.getDistrict(2, value,async  (res) => {
        let result = res.data.map(a => a.locationName)
        setCity(value);
        setDistrict(result[0])
        setDistrictData(result)
        await form.setFieldsValue({
          district : result[0],
        })
      },
      (err) => {
        console.log(res);
      }
      )
    }

    const handleDistrictChange = value => {
      LocsApi.getWard(3, value,async (res) => {
          let result = res.data.map(a => a.locationName)
          setDistrict(value);
          setWard(result[0])
          setWardData(result)
          await form.setFieldsValue({
            ward : result[0],
          })
      }, (err) => {
          console.log(err)
      })
    }


    const onPackageProductCodeChange = value => {
      setPackageProductCode(value);
    };
    // call api lấy danh sách mã gói sản phẩm
    useEffect(() => {
      PackageApi.get(
        productCodeData[0], 
        async (res) => {
          let result = res.data.map(a => a.packageProductCode);
          setProductCodes(result)
          setPackageProductCode(result[0])
          await form.setFieldsValue({
            packageProductCode : result[0],
          })
          
        },(err) => {
            console.log(err);
        }
        )
    },[])


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
          className="sel-flex"
        >
                <Form.Item
                  name="productCode"
                  label="Mã sản phẩm"
                  {...tailFromSelect}
                >
                  <Select  style={{ width: 120 }} onChange={handleProductCodeChange} >
                    {productCodeData.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="typeRequest"
                  label="Loại yêu cầu"
                  {...tailFromSelect}
                >
                  <Select  style={{ width: 120 }} onChange={() => {}} >
                    {typeRequestData.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="packageProductCode"
                  label="Gói sản phẩm"
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
              message: 'Email nhập sai định dạng!',
            },
            {
              required: true,
              message: 'Trường này bắt buộc nhập!',
            },
          ]}
        >
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item
          name="contactPhoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Trường này bắt buộc nhập!',
              whitespace: false
            },
            {
              type : "string",
              pattern : /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
              message: 'Chỉ được phép nhập số, có 10 chữ số',
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
          <Input />
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
          <Input />
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
          <Input  />
        </Form.Item>
        <Form.Item
          name="codeProjectSales"
          label="Mã dự án bán hàng"
        >
          <Input  />
        </Form.Item>
        <Form.Item
          name="Nation"
          label="Quốc gia"
        >
          <Select defaultValue={"Việt Nam"} disabled showArrow={false}>

          </Select>
        </Form.Item>
        <Form.Item
          name="city"
          label="Thành phố"
          rules={
            [
              ({getFieldValue}) => ({
                validator(_, value){
                  var arr = dataCity.map((item) => item === value)
                  console.log(value)
                  if(arr.length < 1){
                    return Promise.reject(new Error("Tên vị trí không tồn tai"));
                  }
                }
              })
            ]
          }
        >
          <Select defaultValue={""} showSearch
              onChange={handleCityChange}  
          >
          {dataCity.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="district"
          label="Quận/Huyện"
        >
          <Select  showSearch 
            onChange={handleDistrictChange}
          >
          {districtData.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ward"
          label="Xã/Phường"
        >
          <Select  showSearch>
          {wardData.map(item => (
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
