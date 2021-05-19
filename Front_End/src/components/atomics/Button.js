import React from 'react';
import '../../assets/styles/atomics/ButtonIcon.scss'
import { Button  } from 'antd';
import Icon from '../atomics/Icon'

/**
 * Component Button
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
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