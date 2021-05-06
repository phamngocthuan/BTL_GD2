import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Input } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const Flexbox = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;

const columns = [
  {
    title: 'Mã yêu cầu',
    dataIndex: 'name',
    render: value => (value === 'initial' ? <Input /> : value)
  },
  {
    title: 'Mã dự án bán hàng',
    dataIndex: 'age',
    render: value => (value === 'initial' ? <Input /> : value),
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Số thuê bao',
    dataIndex: 'address',
    render: value => (value === 'initial' ? <Input /> : value)
  },
  {
    title: 'Loại thuê bao',
    dataIndex: 'address',
    render: value => (value === 'initial' ? <Input /> : value)
  },
  {
    title: 'Số hợp đồng',
    dataIndex: 'address',
    render: value => (value === 'initial' ? <Input /> : value)
  },
  
  {
    title: '',
    dataIndex: 'action',
    width: '50px',
    render: (_, record) => (
      <>
        {record.name === 'initial' && <Button icon="plus" shape="circle" />}
        {record.name !== 'initial' && (
          <Button icon="delete" shape="circle" type="danger" />
        )}
      </>
    )
  }
];

const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === 'initial',
    name: record.name
  })
};

const initial = {
  key: 'initial',
  name: 'initial',
  age: 'initial',
  address: 'initial'
};

const makeRow = counter => ({
  key: counter,
  name: `Row-${counter}`,
  age: counter,
  address: `New York No. ${counter} Lake Park`
});


function TableWrapper() {
  const [dataSource, setDataSource] = useState([makeRow(0)]);
  const [counter, setCounter] = useState(1);


  const columnsInput = [
    {
      key: 'Mã yêu cầu ',
      title: 'Name',
      dataIndex: 'name',
      render: () => <Input />
    },
    {
      title: 'Mã dự án bán hàng',
      dataIndex: 'age',
      render: () => <Input />
    },
    {
      title: 'Tên dự án bán hàng',
      dataIndex: 'address',
      render: () => <Input />
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'address',
      render: () => <Input />
    },
    {
      title: 'Ngày kí hợp đồng',
      dataIndex: 'address',
      render: () => <Input />
    },
    {
      title: 'Số đơn hàng',
      dataIndex: 'address',
      render: () => <Input />
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'address',
      render: () => <Input />
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'address',
      render: () => <Input />
    },
    
    {
      title: '',
      dataIndex: 'action',
      width: '50px',
      render: () => <Button icon="plus" shape="circle" />
    }
  ];

  return (
    <Flexbox>
      <Table
        size="medium"
        columns={columnsInput}
        dataSource={[{}]}
        pagination={false}
      />
      <Table
        size="medium"
        showHeader={false}
        columns={columns}
        dataSource={dataSource}
      />

    </Flexbox>
  );
}

export default function ListTable() {
  return (
    <>
      <TableWrapper />
    </>
  );
}

