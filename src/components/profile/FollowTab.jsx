import { Tabs } from "antd";
import FollowList from "./FollowList";
import { useObserver } from "mobx-react";

const { TabPane } = Tabs;

const FollowTab = ({ data, tabActive, onChange }) => {
  return useObserver(() => {
    return (
      <div>
        <Tabs defaultActiveKey={tabActive} onChange={onChange}>
          <TabPane tab="팔로잉" key="following">
            <FollowList data={data} />
          </TabPane>
          <TabPane tab="팔로워" key="followers">
            <FollowList data={data} />
          </TabPane>
        </Tabs>
      </div>
    );
  });
};

export default FollowTab;
