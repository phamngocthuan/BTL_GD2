import React from 'react';
import '../../assets/styles/atomics/ButtonIcon.scss'
import { Button  } from 'antd';
import Icon from '../atomics/Icon'


export default function ButtonIcon(props){
    const {type, name, key} = props;
    return (
        <>
            <Button 
                type={type} 
                icon={<Icon name={name} />}
                key={key}
            >
            {name}
            </Button>
            
        </>
    )
}