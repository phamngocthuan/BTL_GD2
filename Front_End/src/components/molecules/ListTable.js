import React, { useEffect, useState } from 'react';
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
ListTable.defaultProps = {
  
}


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



function ListTable(props) {
  const [counter, setCounter] = useState(1);

  // const {data } = props;
  // useEffect(() => {
  //   setDataSource(data)
  // })
  const { data , status , rowIndex, setRowIndex} = props;
  
const setRowClassName = (record) => {
  return record.id === rowId ? 'selected-row' : '';
}
  return (
    <Flexbox>
      
      <Table
        size="small"
        columns={columns}
        dataSource={[initial, ...data]}
        rowClassName={(record, index) => index == rowIndex  ? `table-row-select color-${status} ` :  `color-${status}` }
        pagination={
          { position: ['bottom'],
            total : 85
          }
        }
        onRow={(record, index) => {
          return {
            onClick: event => {
              if(rowIndex === index){
                setRowIndex(-1)
              }else 
              setRowIndex(index);
              props.setDataShow(record);
            }, 
          };
        }}
      />

    </Flexbox>
  );
}

export default ListTable;

