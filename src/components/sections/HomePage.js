import React, { useState  } from 'react';
import Header from '../molecules/Header'
import '../../assets/styles/sections/HomePage.scss'
import Manipulation from '../molecules/Manipulation'
import FilterBody from '../molecules/FilterBody'
import ListTable from '../molecules/ListTable'
import TabPane from '../molecules/TabPane'
import Menu from '../molecules/Menu'

HomePage.propTypes = {

};

function HomePage(props) {
    const [dataShowTabPane, setDataShow] = useState({

        CodeRequired : '',
        CodeSale : '',
        NameSale : '',
        NumberContract : '',
        ContactSigningDate : '',
        OrderNumber : '',
        DayRequest : '',
        ProductCode : '',
    });
    return (
        <>
            <div>
                <Header></Header>
                <div className="page-content">
                    <nav className="menu show">
                        <Menu />
                    </nav>
                    <div className="body-content">
                        <Manipulation ></Manipulation>
                        <div className="body-content-detail">
                            <FilterBody />
                            <div className='content-table'>
                                <div className="t-detail">
                                    <ListTable setDataShow = {setDataShow}/>
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
