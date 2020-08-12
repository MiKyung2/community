import styled from "styled-components";
import { Avatar, Row, Col, Card, Skeleton, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import BottomAction from "./BottomAction";
import { useRouter } from "next/router";
import { useObserver } from "mobx-react";
import UserAPI from "../../api/user";

const { Meta } = Card;

const ProfileCard = ({ loading, data, onOpenNote }) => {
  return useObserver(() => {
    const router = useRouter();

    return (
      <Row>
        <Card
          style={{ width: "100%", marginTop: 16, marginBottom: 20 }}
          actions={[
            <BottomAction
              icon={<SettingOutlined style={{ marginRight: "8px" }} key="setting" />}
              title="활동 점수"
              value={data.activityScore || 0}
            />,
            <BottomAction
              icon={<EditOutlined style={{ marginRight: "8px" }} key="edit" />}
              title="팔로잉"
              value={data.followingCnt || 0}
              onClick={() => {
                router.push("/profile/following");
              }}
            />,
            <BottomAction
              icon={<EllipsisOutlined style={{ marginRight: "8px" }} key="ellipsis" />}
              title="팔로워"
              value={data.followerCnt || 0}
              onClick={() => {
                router.push("/profile/followers");
              }}
            />,
          ]}
        >
          <Skeleton loading={loading} avatar active>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      data.profileImg ||
                      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }
                    size="large"
                  />
                }
                title={data.nickname || ""}
                description={data.gitAddr || "-"}
              />
              <div>
                {true ? (
                  <Button
                    onClick={() => {
                      router.push("/profile/edit");
                    }}
                  >
                    프로필 수정
                  </Button>
                ) : (
                  <>
                    <Button 
                      style={{ marginRight: "8px" }} 
                      onClick={() => { 
                        UserAPI.follow({ followed_id: 0, following_id: 0 });
                      }}
                    >팔로우</Button>
                    <Button 
                      style={{ marginRight: "8px" }} 
                      onClick={() => { 
                        UserAPI.unfollow({ followed_id: 0, following_id: 0 });
                      }}
                    >팔로잉</Button>
                    <Button onClick={onOpenNote}>쪽지 보내기</Button>
                  </>
                )}
              </div>
            </div>
          </Skeleton>
        </Card>
      </Row>
    );
  });
};

export default ProfileCard;
