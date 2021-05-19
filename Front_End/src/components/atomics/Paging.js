import React from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

// function onShowSizeChange(current, pageSize) {
//   console.log(current, pageSize);
// }
/**
 * component paging
 * @param {*} props 
 * @returns 
 * @author pnthuan(19/5/2021)
 */

export default function Paging(props){
    return (
        <>
          <Pagination
            total={85}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            defaultPageSize={20}
            defaultCurrent={1}
            />
        </>
      )
}




