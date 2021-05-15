import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import '../../assets/styles/molecules/ListTable.scss'
import { useSelector, useDispatch } from 'react-redux'
import TabPane from '../molecules/TabPane'
import {setIndexSelectedTable, setDataModal, setDataSelectedTable} from '../../redux/action/index'
import {formatDate} from "../../constants/CommonFunction"
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
    render: value => (value === 'initial' ? <Input /> : value)
    
  },
  {
    title: 'Mã dự án bán hàng',
    dataIndex: 'codeProjectSales',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Tên dự án bán hàng',
    dataIndex: 'nameProjectSales',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'numberContract',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'createdDate',
    render: value => (value === 'initial' ? <Input /> : <div style={{textAlign: "center"}}>{formatDate(value)}</div>)

  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'productCode',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Mã gói sản phẩm',
    dataIndex: 'packageProductCode',
    render: value => (value === 'initial' ? <Input /> : value)
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

const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === 'initial',
    name: record.name
  })
};

const initial = {
  id : 'initial',
  codeRequired : 'initial',
  codeProjectSales : 'initial',
  nameProjectSales : 'initial',
  numberContract : 'initial',
  productCode : 'initial',
  createdDate : 'initial',
  packageProductCode : 'initial',
};


function ListTable(props) {

  const dispatch = useDispatch();
  const totals = useSelector(state => state.table.totals) 
  const indexSelected = useSelector(state => state.table.indexSelected)
  
  
  const [current, setCurrent] = useState(1)
  const { data , status , setLimit , offset, setOffset } = props;
  const [dataTabPane,setDataTabPane] = useState({
    codeRequired : '',
    codeProjectSales : '',
    nameProjectSales : '',
    numberContract : '',
    productCode : '',
    createdDate : '',
    packageProductCode : '',
})
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
const setRowClassName = (record) => {
  return record.id === rowId ? 'selected-row' : '';
}

/////////////////////
const [popup, setPopup] = useState( {
  visible: false, 
  x: 0, 
  y: 0
})

// useEffect(() => {
//   function handleWindowMouseMove(e) {
//     // "...state" để đảm bảo không "mất" giá trị width và height
//     setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
//   }
//   // Lưu ý: phần này viết đơn giản nhất có thể
//   window.addEventListener('mousemove', handleWindowMouseMove);
//   return () => window.removeEventListener('mousemove', handleWindowMouseMove);
// }, []);

useEffect(() => {

    function onClickOutside(e){
      setPopup( {...popup, visible : false})
    }
    window.addEventListener(`click`,onClickOutside);
    return () => window.removeEventListener(`click`, onClickOutside);
},[])
////////////////////
  return (
    <>
      <Flexbox>
        <Table
        
          size="small"
          columns={columnInput}
          dataSource={[{}]}
          pagination={false}

        />
        <Table
        className="antd-min"
        showHeader={false}
          size="small"
          columns={columns}
          dataSource={[ ...data]}
          rowClassName={(record, index) => index == indexSelected  ? `table-row-select color-${status} ` :  `color-${status}` }
          pagination={
            { position: ['bottom'],
              total : 100,
              defaultPageSize : 20,
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
          scroll={{ x: 200, y : 400 }}
          onRow={(record, index) => {
            return {
              onClick: event => {
                dispatch(setIndexSelectedTable({indexSelected : index}))
                dispatch(setDataSelectedTable({data : record}))
                dispatch(setDataModal({data : record}))
                setDataTabPane(record);
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

