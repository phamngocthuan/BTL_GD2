import React, { useState , useEffect, useCallback } from 'react';
import Header from '../molecules/Header'
import '../../assets/styles/sections/HomePage.scss'
import Manipulation from '../molecules/Manipulation'
import FilterBody from '../molecules/FilterBody'

import Menu from '../molecules/Menu'
import { CONTRACTSTATUS} from '../../constants/Enum'
import { Contract} from '../../constants/FakeData'
import {getColorStatus } from '../../constants/CommonFunction'



import { useSelector, useDispatch } from 'react-redux'


HomePage.propTypes = {

};

function HomePage(props) {

    const dataShow = useSelector(state => state.homepage.dataShow)
    const dispatch = useDispatch();  

    const [status , setStatus] = useState(CONTRACTSTATUS.UNSENT.COLOR)
    const [colorRow , setColorRow] = useState(CONTRACTSTATUS.UNSENT.COLOR)
    const [indexRowSelected, setIndexRowSelected] = useState(-1)

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
