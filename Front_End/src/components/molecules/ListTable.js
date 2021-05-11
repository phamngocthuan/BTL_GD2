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
    render: value => (value === 'initial' ? <Input /> : value)

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
  codeRequired : 'initial',
  codeProjectSales : 'initial',
  nameProjectSales : 'initial',
  numberContract : 'initial',
  productCode : 'initial',
  createdDate : 'initial',
  packageProductCode : 'initial',
};




function ListTable(props) {
  const [counter, setCounter] = useState(1);

  const { data , status , rowIndex, setRowIndex, setDataShow} = props;
  
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
                setDataShow({})
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

