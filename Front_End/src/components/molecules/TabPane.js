import { Tabs } from 'antd';

const { TabPane } = Tabs;



function TabPanes(props) {
  const {dataShowTabPane}  = props;
  return (
    <Tabs defaultActiveKey="1" onChange={() => {}}>
      <TabPane tab="Thông tin chung" key="1">
        <ul>
            <li>Mã số thuế/địa bàn</li>
            <li>Mã yêu cầu : {dataShowTabPane.CodeRequired ?  dataShowTabPane.CodeRequired : ""}</li>
            <li>Mã dự án bán hàng : {dataShowTabPane.CodeSale ?dataShowTabPane.CodeSale : ""}</li>
            <li>Tên dự án bán hàng : {dataShowTabPane.NameSale ? dataShowTabPane.NameSale :  ""}</li>
            <li>Số hợp đồng : {dataShowTabPane.NumberContract ?dataShowTabPane.NumberContract:  ""}</li>
        </ul>
      </TabPane>
      <TabPane tab="Lý do từ chối" key="2">
        Content of Tab Pane 2
      </TabPane>

  </Tabs>
  )
}
  

export default TabPanes;