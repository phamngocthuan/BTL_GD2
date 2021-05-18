import { Tabs } from 'antd';
import { List} from 'antd';
import '../../assets/styles/molecules/TabPane.scss'
const { TabPane } = Tabs;
import { useSelector } from 'react-redux'
import {formatDate} from '../../constants/CommonFunction'

function TabPanes(props) {
  const {data} = props;
  return (
    <Tabs defaultActiveKey="1" onChange={() => {}}>
      <TabPane tab="Thông tin chung" key="1">
        <div style={{ display : "flex"}}>
          <div className="t-left" >
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Mã số thuế/Mã địa bàn</div>
              <div className="dt-right"></div>
            </div>
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Người liên hệ</div>
              <div className="dt-right">{data.contactName}</div>
            </div>
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Email liên hệ</div>
              <div className="dt-right">{data.contactEmailAddress}</div>
            </div>
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Số điện thoại liên hệ</div>
              <div className="dt-right">{data.contactPhoneNumber}</div>
            </div>
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Gói sản phẩm</div>
              <div className="dt-right">{data.packageProductCode}</div>
            </div>
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Ngày yêu cầu</div>
              <div className="dt-right">{formatDate(data.createdDate)}</div>
            </div>
          </div>
          <div className="t-right">
            <div style={{display: "flex"}} className="h-w">
                <div className="dt-left">Mã sản phẩm</div>
                <div className="dt-right">{data.productCode}</div>
            </div>
            <div style={{display: "flex"}} className="h-w">
              <div className="dt-left">Người tạo yêu cầu</div>
              <div className="dt-right">{data.modifiedBy}</div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Lý do từ chối" key="2">
        Không có dữ liệu
      </TabPane>

  </Tabs>
  )
}
  

export default TabPanes;