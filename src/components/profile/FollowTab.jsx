import { Tabs } from "antd";
import FollowList from "./FollowList";
import { useObserver } from "mobx-react";
import { toJS } from "mobx";

const { TabPane } = Tabs;

const FollowTab = ({ loading, data, tabActive, onChange }) => {
  return useObserver(() => {
    return (
      <div>
        <Tabs defaultActiveKey={tabActive} activeKey={tabActive} onChange={onChange}>
          <TabPane tab="팔로잉" key="following">
            <FollowList loading={loading} data={data} />
          </TabPane>
          <TabPane tab="팔로워" key="followers">
            <FollowList loading={loading} data={data} />
          </TabPane>
        </Tabs>
      </div>
    );
  });
};

export default FollowTab;
