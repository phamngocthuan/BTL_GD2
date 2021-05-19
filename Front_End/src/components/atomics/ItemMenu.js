import React, {  } from 'react';
import '../../assets/styles/atomics/ItemMenu.scss'
import Icon from './Icon'

ItemMenu.propTypes = {

};
/**
 * Component Item của menu
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
function ItemMenu(props) {
    const {} = props;
    return (
        <div className="item-menu">
           <Icon name="IconHomePage" height={20} width={20} fill={"#fff"}/>
           <div className='item-menu-title'>
               Trang chủ
           </div>
        </ div>
    );
}

export default ItemMenu;
