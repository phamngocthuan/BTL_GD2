import { Tabs } from 'antd';

const { TabPane } = Tabs;



const TabPanes = () => (
  <Tabs defaultActiveKey="1" onChange={() => {}}>
    <TabPane tab="Thông tin chung" key="1">
      <ul>
          <li>Mã số thuế/địa bàn</li>
          <li>Người liên hệ : Nguyễn Văn A</li>
      </ul>
    </TabPane>
    <TabPane tab="Lý do từ chối" key="2">
      Content of Tab Pane 2
    </TabPane>

  </Tabs>
);

export default TabPanes;