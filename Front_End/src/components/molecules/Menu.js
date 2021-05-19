import React, {  } from 'react';
import Icon from '../atomics/Icon'
import '../../assets/styles/molecules/Menu.scss'
import ItemMenu from '../atomics/ItemMenu'
import {Link} from 'react-router-dom'
Menu.propTypes = {

};
/**
 * Component Menu
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
function Menu(props) {
    
    return (
        <div className="menu-container">
            <Link to='/home-page'>
                <ItemMenu />
            </Link>
        </div>
    );
}

export default Menu;
