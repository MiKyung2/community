import { Tabs } from "antd";
import FollowList from "./FollowList";
import { useObserver } from "mobx-react";

const { TabPane } = Tabs;

const FollowTab = ({ data, tabActive, onChange }) => {
  return useObserver(() => {
    return (
      <div>
        <Tabs defaultActiveKey={tabActive} onChange={onChange}>
          <TabPane tab="팔로잉" key="1">
            <FollowList data={data} />
          </TabPane>
          <TabPane tab="팔로워" key="2">
            <FollowList data={data} />
          </TabPane>
        </Tabs>
      </div>
    );
  });
};

export default FollowTab;
