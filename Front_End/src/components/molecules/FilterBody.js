
import React, {  useState, useEffect} from 'react';
import '../../assets/styles/molecules/FilterBody.scss'
import ItemOption from '../atomics/ItemOption'
import { Radio, Button } from 'antd';
import Selects from '../atomics/Select'
import InputDate from '../atomics/InputTypeDate'

import ListTable from '../molecules/ListTable'
import { useSelector, useDispatch } from 'react-redux'
import ContractApi from '../api/ContractApi'
import {setTotalTable, setIndexSelectedTable, addDateFilter} from '../../redux/action/index'
import { getStatus } from '../../constants/CommonFunction';
FilterBody.propTypes = {

};
// const body = {
//     "FieldNames" : ["ProductCode", "ContractName", 
//     "CodeRequired", "CodeProjectSales", 
//     "NameProjectSales", 
//     "NumberContract", "CreatedDate", 
//     "PackageProductCode"],
//     "Requests"  : [
       
//     ]

// }
const statusArray = [
    {status : 'Chưa gửi', color : '#007b00', value : 0},
    {status : 'Chờ duyệt', color : '#000000', value : 1},
    {status : 'Từ chối', color : '#ff0000', value : 2},
    {status : 'Đã duyệt', color : '#0000ff', value : 3},
]
function FilterBody(props) {

    const [data,setData] = useState([{
        key : '1',
        id : '1',
        codeRequired : 'ABC!dfadsfaDDF',
        codeSale : 'MSAIVD',
        nameSale : 'Dự án bán lẻ',
        numberContract : '123123qqerqewrqBAC',
        contactSigningDate : '11/11/1111',
        orderNumber : 123,
        cayRequest : '12/12/1212',
        productCode : 'QLNS',
        productCodeA : null,
    
    },
    {
        key : '2',
        id : '2',
        codeRequired : 'ADdfadsfasFADSDFF',
        codeSale : 'MSAIVD212',
        nameSale : 'Dự án bán lẻ ABC',
        numberContract : '12312dfsd3BAC',
        contactSigningDate : '11/11/1111',
        orderNumber : 123,
        dayRequest : '12/12/1212',
        productCode : 'QLNS',
        productCodeA : null,
    
    }])
    const dispatch = useDispatch();
    const [status, setStatus] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const nameStatus = useSelector(state => state.table.status)
    const Requests = useSelector(state => state.filter.Requests)
    const FieldNames = useSelector(state => state.filter.FieldNames)
    const [body, setBody] = useState({
        "FieldNames" : ["ProductCode", "ContractName", 
        "CodeRequired", "CodeProjectSales", 
        "NameProjectSales", 
        "NumberContract", "CreatedDate", 
        "PackageProductCode"],
        "Requests"  : [
           
        ]
    
    })


    // Trạng thái bản ghi
    const elemtStatus = statusArray.map((item,index) => {
        return (
            <Radio 
            value={item.value} 
            key={index}
            >
                {item.status}
            </Radio>
        )
    })
    const onChange = e => {
        setStatus(e.target.value);
        
    };

    useEffect(() => {
        const newBody = {
            FieldNames : FieldNames,
            Requests : Requests
        }
        ContractApi.filter(
            newBody,
        {
            status : status,
            offset : offset,
            limit : limit
        },
        (res) => {
            setData(res.data.data);
            dispatch(setTotalTable({status : getStatus(status) ,  totals : res.data.totals}))
            dispatch(setIndexSelectedTable({indexSelected : -1}));
        },(err) => {
            console.log(err);
        })
    },[Requests])

    // status thay đổi , gọi sự kiện lấy bản ghi
    useEffect(()=> {
        ContractApi.filter(
            body,
        {
            status : status,
            offset : offset,
            limit : limit
        },
        (res) => {
            setData(res.data.data);
            dispatch(setTotalTable({status : getStatus(status) ,  totals : res.data.totals}))
            dispatch(setIndexSelectedTable({indexSelected : -1}));
        },(err) => {
            console.log(err);
        })
    },[status, limit, offset])


    const [reqDate,setReqDate]  = useState([]);

    const addReqDate = (obj) => {
        if(reqDate.length > 0)
        {
            var arr = reqDate.map((item) => item.condition === obj.condition ? {...item, ...obj} : item );
            if(arr.length === 1){
                setReqDate([...reqDate, obj])
            }else
                setReqDate([...arr]);
        }
        else setReqDate([...reqDate, obj])
    }

    const addFilter = () => {
        dispatch(addDateFilter({data : [...reqDate]}))
    }
    return (
        <>
            <div className='filter-body-content'>
                <div className='filter-top'>
                
                    <Radio.Group onChange={onChange} value={status}>
                        {elemtStatus}
                    </Radio.Group>

                </div>
                <div className='filter-bottom'>
                        <div className="pre-time">
                            <span style={{paddingRight:'5px'}}>Từ</span>
                            <InputDate condition={3} name="CreatedDate" addReqDate={addReqDate}/>
                        </div>
                        <div className="bef-time">
                            <span style={{paddingRight:'5px'}}>Đến</span>
                            <InputDate condition={4} name="CreatedDate" addReqDate={addReqDate}/>
                        </div>
                        <div>
                            <Button type="primary"
                                onClick={() => addFilter()}
                            >Lấy dữ liệu</Button>
                        </div>
                </div>
                
            </div>
            <div className='content-table'>
                <div className="t-detail">
                    <ListTable 
                    data={data} 
                    status={nameStatus}
                    setLimit={setLimit}
                    offset={offset}
                    setOffset={setOffset}
                        />
                </div>
                
            </div>
        </>
        
    );
}

export default FilterBody;
