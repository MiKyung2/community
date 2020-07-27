import { Tabs, Form, Input, List, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const strType = { following: "팔로잉", followers: "팔로워" };
const Followers = () => {
  return (
    <div>
      <Tabs defaultActiveKey="2" onChange={() => {}}>
        <TabPane tab="팔로잉" key="1">
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                key: 1,
                id: 1,
                nickname: "xowns9418",
                image: "",
                type: "following",
              },
              {
                key: 2,
                id: 2,
                nickname: "Hello World",
                image: "",
                type: "followers",
              },
              {
                key: 3,
                id: 3,
                nickname: "aaabbkk",
                image: "",
                type: "following",
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href={`/${item.id}`}>{item.nickname}</a>}
                />
                <Button>{strType[item.type]}</Button>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="팔로워" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Followers;
