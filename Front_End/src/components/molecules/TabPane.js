import { Tabs } from 'antd';
import { List} from 'antd';
import '../../assets/styles/molecules/TabPane.scss'
const { TabPane } = Tabs;



function TabPanes(props) {
  const {dataShowTabPane}  = props;
  return (
    <Tabs defaultActiveKey="1" onChange={() => {}}>
      <TabPane tab="Thông tin chung" key="1">
      <h3>Mã số thuế/địa bàn</h3>
      <div style = {{display : "flex"}}>
        <div className='tab-p-left'
          style = {{
            minWidth : "150px"
          }}
        
        >
              
              <div>Mã yêu cầu : </div>
              <div>Mã dự án bán hàng : </div>
              <div>Tên dự án bán hàng : </div>
              <div>Số hợp đồng : </div>
          </div>
          <div className="tab-p-right">
              <div> {dataShowTabPane.CodeRequired ?  dataShowTabPane.CodeRequired : ""}</div>
              <div> {dataShowTabPane.CodeSale ?dataShowTabPane.CodeSale : ""}</div>
              <div> {dataShowTabPane.NameSale ? dataShowTabPane.NameSale :  ""}</div>
              <div>{dataShowTabPane.NumberContract ?dataShowTabPane.NumberContract:  ""}</div>
          </div>
      </div>
        
      </TabPane>
      <TabPane tab="Lý do từ chối" key="2">
        Content of Tab Pane 2
      </TabPane>

  </Tabs>
  )
}
  

export default TabPanes;