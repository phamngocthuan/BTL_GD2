import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import '../../assets/styles/molecules/ListTable.scss'
import { useSelector, useDispatch } from 'react-redux'
import TabPane from '../molecules/TabPane'
import {setIndexSelectedTable, setDataModal, setDataSelectedTable, setDataTabPane} from '../../redux/action/index'
import {formatDate, formatMoney} from "../../constants/CommonFunction"
import InputOption from '../atomics/InputOption'
import Popup from '../atomics/Popup'

import ContractApi from "../api/ContractApi"
const Flexbox = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;
ListTable.defaultProps = {
  
}


const columns = [
  {
    title: 'Mã yêu cầu',
    dataIndex: 'codeRequired',
    children : [
      {
        title : <InputOption name="CodeRequired"/>,
        dataIndex : 'codeRequired',
        render: value => (value === 'initial' ? <InputOption name="CodeRequired" /> : value)
      }
    ]
    ,
    
    
  },
  {
    title: 'Mã dự án bán hàng',
    dataIndex: 'codeProjectSales',
    children : [
      {
      title : <InputOption name="CodeProjectSales"/>,
      dataIndex : 'codeProjectSales',
      render: value => (value === 'initial' ? <InputOption name="CodeProjectSales" />  : value)
      }
    ]
    ,
    

  },
  {
    title: 'Tên dự án bán hàng',
    dataIndex: 'nameProjectSales'
    ,
    children : [
      {
      title : <InputOption name="NameProjectSales"/>,
      dataIndex : 'nameProjectSales',
      render: value => (value === 'initial' ? <InputOption name="NameProjectSales" /> : value)
      }
    ],
    

  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'numberContract',
    children : [
      {
      title : <InputOption name="NumberContract"/>,
      dataIndex : 'numberContract',
      render: value => (value === 'initial' ? <Input /> : value)
      }
    ]

  },
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'createdDate',
    children : [
      {
      title : <InputOption name="CreatedDate"/>,
      dataIndex : 'createdDate',
      render: value => (value === 'initial' ? <Input /> : <div style={{textAlign: "center"}}>{formatDate(value)}</div>)
      }
    ]

  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'productCode',
    children : [
      {
      title : <InputOption name="ProductCode"/>,
      dataIndex : 'productCode',
      render: value => (value === 'initial' ? <Input /> : value),
      }
    ]

  },
  {
    title: 'Mã gói sản phẩm',
    dataIndex: 'packageProductCode',
    
    children : [
      {
      title : <InputOption name="PackageProductCode"/>,
      dataIndex : 'packageProductCode',
      render: value => (value === 'initial' ? <Input /> : value),
      }
    ]
  },{
    title : "Tiền hợp đồng",
    dataIndex: 'money',
    
    children : [
      {
      title : <InputOption name="Money"/>,
      dataIndex : 'money',
      render : value => (value === 'initial' ? <Input /> : <div style={{textAlign: "right"}}>{formatMoney(value)}</div>),
      }
    ]
  }
];
const columnInput = [
  {
    title: 'Mã yêu cầu',
    dataIndex: 'codeRequired',
    render: value => <InputOption name="CodeRequired" />
    
  },
  {
    title: 'Mã dự án bán hàng',
    dataIndex: 'codeProjectSales',
    render: value =>  <InputOption name="CodeProjectSales" /> 

  },
  {
    title: 'Tên dự án bán hàng',
    dataIndex: 'nameProjectSales',
    render: value =>  <InputOption name="NameProjectSales" />

  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'numberContract',
    render: value =>  <Input /> 

  },
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'createdDate',
    render: value =>  <Input /> 

  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'productCode',
    render: value =>  <Input /> 

  },
  {
    title: 'Mã gói sản phẩm',
    dataIndex: 'packageProductCode',
    render: value =>  <Input /> 
  }
];



const initial = {
  id : 'initial',
  codeRequired : 'initial',
  codeProjectSales : 'initial',
  nameProjectSales : 'initial',
  numberContract : 'initial',
  productCode : 'initial',
  createdDate : 'initial',
  packageProductCode : 'initial',
  money : 'initial'
};
/**
 * Component Hiển thị table và danh sách data
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */

function ListTable(props) {

  const dispatch = useDispatch();
  const totals = useSelector(state => state.table.totals) 
  const indexSelected = useSelector(state => state.table.indexSelected)
  const dataSelected = useSelector(state => state.table.dataSelected);
  const loading = useSelector(state => state.table.loading)
  const { data , status , setLimit , offset, setOffset, current, setCurrent } = props;

  const dataTabPane = useSelector(state => state.tabpane.dataTabPane)


    /**
     * Nhận sự kiện chọn 1 hàng
     * @author pnthuan(19/5/2021)
     */
    useEffect(() => {
      if(indexSelected < 0)
        setDataTabPane({
          codeRequired : '',
          codeProjectSales : '',
          nameProjectSales : '',
          numberContract : '',
          productCode : '',
          createdDate : '',
          packageProductCode : '',
        })
    }
    ,[indexSelected])


    /////////////////////
    // Pop hiên thị vị trí pop up khi click chuột phải vào 1 cột của table
    const [popup, setPopup] = useState( {
      visible: false, 
      x: 0, 
      y: 0
    })


    //Hàm lắng nghe sự kiện khi click bên ngoài table
    //@author pnthuan(19/5/2021)
    useEffect(() => {

        function onClickOutside(e){
          setPopup( {...popup, visible : false})
        }
        window.addEventListener(`click`,onClickOutside);
        return () => window.removeEventListener(`click`, onClickOutside);
    },[])

  return (
    <>
      <Flexbox>
        <Table
        className="antd-min"
        bordered
        showHeader={true}
          size="small"
          columns={columns}
          dataSource={[ ...data]}
          rowClassName={(record, index) => {
            
            var arr = dataSelected.filter((item) => item.codeRequired  === record.codeRequired);
            return arr.length > 0 ? `table-row-select color-${status} ` : `color-${status}`;
          } }
          pagination={
            { position: ['bottom'],
              total : 100,
              defaultPageSize : 10,
              showTotal : () => `Tổng số bản ghi: ${totals}`,
              pageSizeOptions : [10, 20, 30, 50],
              onChange : (page, pageSize) => {
                if(page != current){
                  setCurrent(page)
                  setOffset( (page - 1) * pageSize);
                }
                else
                setLimit(pageSize);
              },
              current : current
            }
          }
          scroll={{ x: 1500, y : 520 }}
          // click 1 dòng
          onRow={(record, index) => {
            return {
              onClick: event => {
                dispatch(setIndexSelectedTable({indexSelected : index}))
                dispatch(setDataSelectedTable({data : record}))
                dispatch(setDataModal({data : record}))
                dispatch(setDataTabPane({data : record}))
              }
              , 
              onContextMenu : event => {
                event.preventDefault();
                setPopup( {
                    record : record,
                    visible: true,
                    x: event.clientX,
                    y: event.clientY
                  }
                )
              }
            };
          }}
          loading={loading}
        />
        <Popup {...popup}/>
      </Flexbox>
      <div className="p-detail">
          <TabPane data={dataTabPane}/>
      </div>
    
    </>
    
  );
}

export default ListTable;

