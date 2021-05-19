
import 'antd/dist/antd.css';

import {  notification } from 'antd';
/**
 * Component popup hiển thị cảnh báo
 * @param {*} type 
 * @param {*} message 
 * @param {*} description 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
const Notification = (type, message, description) => {
    return (
        notification[type]({
            message: message,
            description:
              description,
          })
    )
  
};
export default Notification;