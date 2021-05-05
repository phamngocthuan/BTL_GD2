import React, {  } from 'react';
import '../../assets/styles/atomics/ItemMenu.scss'
import Icon from './Icon'

ItemMenu.propTypes = {

};

function ItemMenu(props) {
    const {} = props;
    return (
        <div className="item-menu">
           <Icon name="IconHomePage" height={20} width={20}/>
           <div className='item-menu-title'>
               HomePage
           </div>
        </ div>
    );
}

export default ItemMenu;
