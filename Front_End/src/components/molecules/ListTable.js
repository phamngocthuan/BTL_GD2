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
  //const loading = useSelector(state => state.table.loading)


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

    /// check box

    const onSelectChange = (selectedRowKeys, selectedRows) => {
      //let le = selectedRows.length;
      console.log('selectedRowKeys changed: ', selectedRowKeys);
                // dispatch(setIndexSelectedTable({indexSelected : index}))
                // dispatch(setDataSelectedTable({data : selectedRows}))
                
                // dispatch(setDataModal({data : selectedRows[le - 1]}))
                // dispatch(setDataTabPane({data : selectedRows[le - 1]}))
    };

   // const [index, setIndex] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState(indexSelected)
    const [change, setChange] = useState([])

    // useEffect(() => {

    //   if(loading){
    //     setSelectedRowKeys(indexSelected)
    //   }
    //   return () => {}
    // },[loading])
    Array.prototype.remove = function() {
      var what, a = arguments, L = a.length, ax;
      while (L && this.length) {
          what = a[--L];
          while ((ax = this.indexOf(what)) !== -1) {
              this.splice(ax, 1);
          }
      }
      return this;
  };
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        // let le = selectedRows.length;
        // var arr = [...indexSelected, ...selectedRowKeys]
        //         if(selectedRowKeys.length == 0){
        //           for(let i = 0;i< change.length ;i++){
        //             arr.remove(change[i])
        //           }
        //         }
        //        else
        //         if(change.length > selectedRowKeys.length){
        //           var items = change.filter((item) => !selectedRowKeys.includes(item));
        //           arr.remove(items[0])
        //         }
        //         if(change.length == selectedRowKeys.length){
        //           arr = [...indexSelected, ]
        //         }
        //          setChange(selectedRowKeys)
        //          var newArr = Array.from(new Set(arr));
        //           dispatch(setIndexSelectedTable({indexSelected : newArr }))
        //           setSelectedRowKeys(newArr)
                 // setIndex({selectedRowKeys})
                  // dispatch(setDataSelectedTable({data : selectedRows}))
                  
                  // dispatch(setDataModal({data : selectedRows[le - 1]}))
                  // dispatch(setDataTabPane({data : selectedRows[le - 1]}))
      },
      onSelect : (record, selected) => {
        console.log("select one", selected)
        if(selected){
          let arr = [...indexSelected, record.codeRequired];
          setSelectedRowKeys(arr);
          dispatch(setIndexSelectedTable({indexSelected : arr }))
          let newDataSelected = [...dataSelected, record];
          dispatch(setDataSelectedTable({data : newDataSelected}))
          dispatch(setDataTabPane({data : record}))
        }else {
          let arr = indexSelected.filter((item) => item != record.codeRequired);
          let newDataSelected = dataSelected.filter((item) => item.codeRequired != record.codeRequired)
          setSelectedRowKeys(arr);
          dispatch(setIndexSelectedTable({indexSelected : arr }))
          dispatch(setDataSelectedTable({data : newDataSelected}))
          dispatch(setDataTabPane({data : {}}))
        }
      },
      onSelectNone : () => {
        console.log("Clear");
      },
      onSelectAll : (selected, selectedRows, changeRows) => {
        console.log(changeRows)
        if(selected){
          let codes = changeRows.map((item) => item.codeRequired)
          let arr = [...indexSelected, ...codes];
          var newArr = Array.from(new Set(arr));
          setSelectedRowKeys(newArr);
          dispatch(setIndexSelectedTable({indexSelected : newArr }))

          let newData = [...dataSelected, ...changeRows]
          dispatch(setDataSelectedTable({data : newData}))
          dispatch(setDataTabPane({data : changeRows[0]}))
        }else {
          for(let i =0;i<changeRows.length;i++){
            indexSelected.remove(changeRows[i].codeRequired)
            dataSelected.remove(changeRows[i])
          }
          setSelectedRowKeys(indexSelected);
          dispatch(setIndexSelectedTable({indexSelected : indexSelected }))
          dispatch(setDataSelectedTable({data : dataSelected}))
          dispatch(setDataTabPane({data : {}}))

        }
        
      }
    };

    const dataSource = data.map((item,index) => {
      item["key"] = item.codeRequired;
      return item;
    })
    
    useEffect(() => {
      if(loading)
        setChange([])
      return () => {}
    },[loading])
    //const selectedRowKeys = []

  return (
    <>
      <Flexbox>
        <Table
        rowSelection={rowSelection}
        className="antd-min"
        bordered
        showHeader={true}
          size="small"
          columns={columns}
          dataSource={[ ...dataSource]}
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
          // onRow={(record, index) => {
          //   return {
          //     onClick: event => {
          //       dispatch(setIndexSelectedTable({indexSelected : index}))
          //       dispatch(setDataSelectedTable({data : record}))
          //       dispatch(setDataModal({data : record}))
          //       dispatch(setDataTabPane({data : record}))
          //     }
          //     , 
          //     onContextMenu : event => {
          //       event.preventDefault();
          //       setPopup( {
          //           record : record,
          //           visible: true,
          //           x: event.clientX,
          //           y: event.clientY
          //         }
          //       )
          //     }
          //   };
          // }}
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

