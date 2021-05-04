import React, {  } from 'react';
import Header from '../molecules/Header'
import '../../assets/styles/sections/HomePage.scss'
import Manipulation from '../molecules/Manipulation'
import FilterBody from '../molecules/FilterBody'
import ListTable from '../molecules/ListTable'
import TabPane from '../molecules/TabPane'

HomePage.propTypes = {

};

function HomePage(props) {
    
    return (
        <>
            <div>
                <Header></Header>
                <div className="page-content">
                    <nav className="menu show">

                    </nav>
                    <div className="body-content">
                        <Manipulation ></Manipulation>
                        <div className="body-content-detail">
                            <FilterBody />
                            <div className='content-table'>
                                <div className="t-detail">
                                    <ListTable />
                                </div>
                                <div className="p-detail">
                                    <TabPane />
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
