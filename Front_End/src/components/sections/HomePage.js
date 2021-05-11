import React, { useState , useEffect } from 'react';
import Header from '../molecules/Header'
import '../../assets/styles/sections/HomePage.scss'
import Manipulation from '../molecules/Manipulation'
import FilterBody from '../molecules/FilterBody'
import ListTable from '../molecules/ListTable'
import TabPane from '../molecules/TabPane'
import Menu from '../molecules/Menu'
import { CONTRACTSTATUS} from '../../constants/Enum'
import { Contract} from '../../constants/FakeData'
import {getColorStatus } from '../../constants/CommonFunction'
import { useSetState } from 'react-use';
import axios from 'axios';
import ContractApi from '../api/ContractApi'
HomePage.propTypes = {

};

function HomePage(props) {
    const [dataShowTabPane, setDataShow] = useState({
        codeRequired : '',
        codeProjectSales : '',
        nameProjectSales : '',
        numberContract : '',
        productCode : '',
        createdDate : '',
        packageProductCode : '',
    });
    const [status , setStatus] = useState(CONTRACTSTATUS.UNSENT.COLOR)
    const [colorRow , setColorRow] = useState(CONTRACTSTATUS.UNSENT.COLOR)
    const [nameStatus, setNameStatus] = useState('UNSENT')
    const [data, setData] = useState([])
    const [indexRowSelected, setIndexRowSelected] = useState(-1)

    useEffect(() => {
        if(indexRowSelected == '-1'){
            setDataShow({
                CodeRequired : '',
                CodeSale : '',
                NameSale : '',
                NumberContract : '',
                ContactSigningDate : '',
                OrderNumber : '',
                DayRequest : '',
                ProductCode : '',
            })
        }

        return () => {}
    },[indexRowSelected])

    useEffect(() => {
        var newData = Contract.filter((item) => {
            return item.status == status;
        })
        if(newData.length > 0){
            setData(newData[0].data);
            setColorRow(getColorStatus(newData[0].name))
            setNameStatus(newData[0].name)
        }
        setIndexRowSelected(-1)
        setDataShow({
            CodeRequired : '',
            CodeSale : '',
            NameSale : '',
            NumberContract : '',
            ContactSigningDate : '',
            OrderNumber : '',
            DayRequest : '',
            ProductCode : '',
        })
        return () => {};
    },[status])
    const body = {
        "FieldNames" : ["ProductCode", "ContractName", "'CodeRequired", "CodeProjectSales", "NameProjectSales", 
    "NumberContract", "CreatedDate", "PackageProductCode"],
        "Requests"  : [
           
        ]
    
    }
    useEffect(()=> {
        // axios.get(`https://localhost:44388/api/v1/contracts/filter`)
        // .then(res => {
        //     console.log(res.data);
        // })
        
        ContractApi.filter(
            body,
        {
            status : 1,
            offset : 0,
            limit : 20
        },
        (res) => {
            //setData(res.data);
            console.log(res.data)
        },(err) => {
            console.log(err);
        })
    },[])
    return (
        <>
            <div>
                <Header></Header>
                <div className="page-content">
                    <nav className="menu show">
                        <Menu />
                    </nav>
                    <div className="body-content">
                        <Manipulation 
                           data = {dataShowTabPane}
                           setData = {setDataShow}
                           rowSelected ={indexRowSelected}
                           setIndexRowSelected={setIndexRowSelected}
                        ></Manipulation>
                        <div className="body-content-detail">
                            <FilterBody  
                            status={status} 
                            setStatus={setStatus}
                            />
                            <div className='content-table'>
                                <div className="t-detail">
                                    <ListTable 
                                    setDataShow={setDataShow} 
                                    data={data} 
                                    status={nameStatus}
                                    rowIndex={indexRowSelected}
                                    setRowIndex={setIndexRowSelected}
                                     />
                                </div>
                                <div className="p-detail">
                                    <TabPane dataShowTabPane={dataShowTabPane}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default HomePage;
