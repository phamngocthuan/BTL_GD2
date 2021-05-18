import React from 'react';
import '../../assets/styles/atomics/ButtonIcon.scss'
import { Button  } from 'antd';
import Icon from '../atomics/Icon'


export default function ButtonIcon(props){
    const {type, name, title, onClick} = props;
    return (
        <>
            <Button 
                type={type} 
                icon={<Icon name={name}  
                style={{
                    marginRight : "5px",
                    marginTop : "3px",
                    marginBottom : "-1px"
                }}/>}
                onClick={onClick}
            >
                <span>
                    {title}
                </span>
            
            </Button>
            
        </>
    )
}