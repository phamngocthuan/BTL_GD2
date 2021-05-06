import React, {  } from 'react';
import Icon from '../atomics/Icon'
import '../../assets/styles/molecules/Menu.scss'
import ItemMenu from '../atomics/ItemMenu'
import {Link} from 'react-router-dom'
Menu.propTypes = {

};

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
