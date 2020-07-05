import styled from 'styled-components';
import { Avatar, Row, Col, Card, Skeleton } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
import BottomAction from "./_view/BottomAction/component";

const { Meta } = Card;

const ProfileCard = (props) => {
  return (
    <Row>
      <Card
        style={{ width: "100%", marginTop: 16, marginBottom: 20 }}
        actions={[
          <BottomAction title={<><SettingOutlined style={{ marginRight: "8px" }} key="setting" />활동 점수</>} value="10" />,
          <BottomAction title={<><EditOutlined style={{ marginRight: "8px" }} key="edit" />팔로잉</>} value="10" />,
          <BottomAction title={<><EllipsisOutlined style={{ marginRight: "8px" }} key="ellipsis" />팔로워</>} value="10" />,
        ]}
      >
        <Skeleton loading={props.loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
            }
            title="김코딩"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </Row>
  );
};

export default styled(ProfileCard)`
`;
