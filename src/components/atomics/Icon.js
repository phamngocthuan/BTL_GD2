
import React from 'react'
import Pointer from './Icons/Pointer'
import InputRadio from './Icons/InputRadio'

const Icon = (props) => {
    const {name} = props;

    switch(name){
        case 'Pointer':
            return <Pointer {...props} />;
        case 'InputRadio':
            return <InputRadio {...props} />;
        default : 
            return <Pointer {...props} />;
    }
}
export default Icon;