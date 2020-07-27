import {
  MessageOutlined,
  LikeOutlined,
  DislikeOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { List, Avatar } from "antd";
import IconText from "../common/IconText";

const ProfileList = (props) => {
  return (
    <List
      dataSource={props.dataSource}
      renderItem={(item) => (
        <List.Item key={item.title}>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.description}
          />
          <div>{item.writer}</div>
        </List.Item>
      )}
    >
      {props.loading && (
        <div className="demo-loading-container">
          <Spin />
        </div>
      )}
    </List>
  );
};

export default ProfileList;
