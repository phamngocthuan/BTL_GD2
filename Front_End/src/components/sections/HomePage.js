import React, { useState , useEffect, useCallback } from 'react';
import Header from '../molecules/Header'
import '../../assets/styles/sections/HomePage.scss'
import Manipulation from '../molecules/Manipulation'
import FilterBody from '../molecules/FilterBody'

import Menu from '../molecules/Menu'
import { CONTRACTSTATUS} from '../../constants/Enum'




HomePage.propTypes = {

};
/**
 * Component hiển thị layout của 1 trang
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
function HomePage(props) {
    const [status , setStatus] = useState(CONTRACTSTATUS.UNSENT.COLOR)
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
                        ></Manipulation>
                        <div className="body-content-detail">
                            <FilterBody  
                            status={status} 
                            setStatus={setStatus}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default HomePage;
