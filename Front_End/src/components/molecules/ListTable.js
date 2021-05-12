import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import '../../assets/styles/molecules/ListTable.scss'
import { useSelector, useDispatch } from 'react-redux'
import TabPane from '../molecules/TabPane'
import {setIndexSelectedTable, setDataModal} from '../../redux/action/index'
import {formatDate} from "../../constants/CommonFunction"
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
const setRowClassName = (record) => {
  return record.id === rowId ? 'selected-row' : '';
}
  return (
    <>
      <Flexbox>
        <Table
          size="small"
          columns={columns}
          dataSource={[initial, ...data]}
          rowClassName={(record, index) => index == indexSelected  ? `table-row-select color-${status} ` :  `color-${status}` }
          pagination={
            { position: ['bottom'],
              total : 60,
              defaultPageSize : 10,
              showTotal : () => `Tổng số bản ghi: ${totals}`,
              pageSizeOptions : [5, 10, 15, 20],
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
                dispatch(setDataModal({data : record}))
                setDataTabPane(record);
              }
            //     if(rowIndex === index){

            //     }else {

            //   }
            // }
              , 
            };
          }}
        />
      </Flexbox>
      <div className="p-detail">
          <TabPane data={dataTabPane}/>
      </div>
    
    </>
    
  );
}

export default ListTable;

