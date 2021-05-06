import React, {  } from 'react';
import HomePage from '../sections/HomePage'
import '../../assets/styles/pages/HomePageManager.scss'

HomePageManger.propTypes = {

};

function HomePageManger(props) {
    
    return (
        <div className="homepage-container">
            <HomePage></HomePage>
        </div>
    );
}

export default HomePageManger;
