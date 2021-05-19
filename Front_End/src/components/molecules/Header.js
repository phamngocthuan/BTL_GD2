import React, {  } from 'react';
import '../../assets/styles/molecules/Header.scss'
import Icon from '../atomics/Icon'
Header.propTypes = {

};
/**
 * Component Header
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
function Header(props) {
    
    return (
        <div className="header-container">
            <div className="header-left">
                <Icon  name="Logo" height={40} width={40}/>
                <div className="name-logo">
                    MISA IMS
                </div>
            </div>
            <div className="header-right">

            </div>
        </div>
    );
}

export default Header;
