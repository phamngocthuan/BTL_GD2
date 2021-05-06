import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import '../../assets/styles/molecules/ListTable.scss'
import Paging from '../atomics/Paging'

const Flexbox = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;

const columns = [
  {
    title: 'Mã yêu cầu',
    dataIndex: 'CodeRequired',
    render: value => (value === 'initial' ? <Input /> : value)
    
  },
  {
    title: 'Mã dự án bán hàng',
    dataIndex: 'CodeSale',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Tên dự án bán hàng',
    dataIndex: 'NameSale',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'NumberContract',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Ngày kí hợp đồng',
    dataIndex: 'ContactSigningDate',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Số đơn hàng',
    dataIndex: 'OrderNumber',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'DayRequest',
    render: value => (value === 'initial' ? <Input /> : value)

  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'ProductCode',
    render: value => (value === 'initial' ? <Input /> : value)

  }
  // ,
  
  // {
  //   title: '',
  //   dataIndex: 'action',
  //   width: '50px',
  //   render: (_, record) => (
  //     <>
  //       {record.name === 'initial' && <Button icon="plus" shape="circle" />}
  //       {record.name !== 'initial' && (
  //         <Button icon="delete" shape="circle" type="danger" />
  //       )}
  //     </>
  //   )
  // }
];

const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === 'initial',
    name: record.name
  })
};

const initial = {
    
    id : 'initial',
    CodeRequired : 'initial',
    CodeSale : 'initial',
    NameSale : 'initial',
    NumberContract : 'initial',
    ContactSigningDate : 'initial',
    OrderNumber : 'initial',
    DayRequest : 'initial',
    ProductCode : 'initial',
};

const data = [
  {
    key : '1',
    id : '1',
    CodeRequired : 'ABC!DDF',
    CodeSale : 'MSAIVD',
    NameSale : 'Dự án bán lẻ',
    NumberContract : '123123qqerqewrqBAC',
    ContactSigningDate : '11/11/1111',
    OrderNumber : 123,
    DayRequest : '12/12/1212',
    ProductCode : 'ADKBDI123',

  },
  {
    key : '2',
    id : '2',
    CodeRequired : 'ADFADSDFF',
    CodeSale : 'MSAIVD212',
    NameSale : 'Dự án bán lẻ ABC',
    NumberContract : '12312dfsd3BAC',
    ContactSigningDate : '11/11/1111',
    OrderNumber : 123,
    DayRequest : '12/12/1212',
    ProductCode : 'ADKBDI123',

  }
]

function ListTable(props) {
  // const [dataSource, setDataSource] = useState([makeRow(0)]);
  const [counter, setCounter] = useState(1);


  
const [rowId, setRowId] = useState('')
const setRowClassName = (record) => {
  return record.id === rowId ? 'selected-row' : '';
}
  return (
    <Flexbox>
      
      <Table
        size="small"
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={[initial, ...data]}
        pagination={
          { position: ['bottom'],
            total : 85
          }
        }
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              props.setDataShow(record);
            }, 
          };
        }}
      />

    </Flexbox>
  );
}

export default ListTable;

