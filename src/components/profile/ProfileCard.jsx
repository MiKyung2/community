import styled from "styled-components";
import { Popconfirm, message, Avatar, Row, Col, Card, Skeleton, Button } from "antd";
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

const ProfileCard = ({ loading, data, onOpenNote, onUpdate }) => {
  return useObserver(() => {
    const router = useRouter();
    const { id } = router.query;
    const userId = 8;

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
              value={data.followingList.cnt || 0}
              onClick={() => {
                router.push(`/profile/[id]/[cate]`,`/profile/${id}/following`);
              }}
            />,
            <BottomAction
              icon={<EllipsisOutlined style={{ marginRight: "8px" }} key="ellipsis" />}
              title="팔로워"
              value={data.followedList.cnt || 0}
              onClick={() => {
                router.push(`/profile/[id]/[cate]`,`/profile/${id}/followers`);
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
                description={<a style={{ textDecoration: "underline" }} href={data.gitAddr} target="_blank">{data.gitAddr || "-"}</a>}
              />
              <div>
                {id == userId ? (
                  <Button
                    onClick={() => {
                      router.push("/profile/edit");
                    }}
                  >
                    프로필 수정
                  </Button>
                ) : (
                  <>
                    {data?.followedList?.followed_users.find((d) => d.id === userId) ? (
                      <Popconfirm
                        placement="bottomRight"
                        title="팔로우를 취소하시겠습니까?"
                        onConfirm={() => {
                          UserAPI.unfollow({ data: { followed_id: id, following_id: userId } });
                          // message.info("팔로우가 취소됬습니다.");
                        }}
                        okText="확인"
                        cancelText="취소"
                      >
                        <Button
                          type="primary"
                          style={{ marginRight: "8px" }}
                        >팔로우</Button>
                      </Popconfirm>
                    ) : (
                      <Button
                        type="primary"
                        style={{ marginRight: "8px" }} 
                        onClick={() => { 
                          UserAPI.follow({ data: { followed_id: id, following_id: userId } });
                          onUpdate();
                      }}>팔로우하기</Button>
                    )}
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
