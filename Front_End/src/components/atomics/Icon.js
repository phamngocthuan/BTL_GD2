
import React from 'react'
import Pointer from './Icons/Pointer'
import InputRadio from './Icons/InputRadio'
import Logo from './Icons/Logo'
import IconHomePage from './Icons/IconHomePage'
import IconDelete from './Icons/IconDelete'
import IconDownload from './Icons/IconDownload'
import IconModify from './Icons/IconModify'
import IconCancel from './Icons/IconCancel'
import IconDone from './Icons/IconDone'
/**
 * Component Icon
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
const Icon = (props) => {
    const {name} = props;

    switch(name){
        case 'Pointer':
            return <Pointer {...props} />;
        case 'InputRadio':
            return <InputRadio {...props} />;
        case 'Logo':
            return <Logo {...props} />;
        case 'IconHomePage':
            return <IconHomePage {...props} />;
        case 'IconDelete':
            return <IconDelete {...props} />;
        case 'IconDownload':
            return <IconDownload {...props} />;
        case 'IconModify':
            return <IconModify {...props} />;
        case 'IconCancel':
            return <IconCancel {...props} />;
        case 'IconDone':
            return <IconDone {...props} />;
        default : 
            return <Pointer {...props} />;
    }
}
export default Icon;