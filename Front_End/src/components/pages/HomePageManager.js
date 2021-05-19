import React, {  } from 'react';
import HomePage from '../sections/HomePage'
import '../../assets/styles/pages/HomePageManager.scss'

HomePageManger.propTypes = {

};
/**
 * 
 * Component nơi quản lý các trang của 1 web
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
function HomePageManger(props) {
    
    return (
        <div className="homepage-container">
            <HomePage></HomePage>
        </div>
    );
}

export default HomePageManger;
