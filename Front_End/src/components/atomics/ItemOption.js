import React, {  } from 'react';
import '../../assets/styles/atomics/ItemOption.scss'
import Icon from './Icon'

ItemOption.propTypes = {

};

function ItemOption(props) {
    const {content, nameIcon, squareShape, onClick, item} = props;
    return (
        <div className='item-option' onClick={() => 
            {
                
                onClick(item.content,item.state)
            }
        
        }>
            { nameIcon && 
                <div className="icon-item-option">
                    <Icon name={nameIcon} style={{ margin : '4px'}}/>
                </div>
            }
            { squareShape && 
                <div className="status-square-shape"
                    style={
                        {
                            backgroundColor : squareShape,
                            width : '10px',
                            height: '10px',
                            margin: '4px'
                        }
                    }
                >
                    
                </div>
            }
            <div>
                {content}
            </div>
        </div>
    );
}

export default ItemOption;
