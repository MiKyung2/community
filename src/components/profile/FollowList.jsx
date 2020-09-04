import { List, Avatar, Button } from "antd";
import { useObserver } from "mobx-react";
const strType = { following: "팔로잉", followers: "팔로워" };

const FollowList = ({ loading, data }) => {
  return useObserver(() => {
    return (
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<a href={`/profile/${item.id}`}>{item.nickname}</a>}
            />
            <Button>{strType[item.type]}</Button>
          </List.Item>
        )}
      />
    );
  });
};

export default FollowList;
