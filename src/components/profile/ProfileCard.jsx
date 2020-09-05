import styled from 'styled-components';
import {
  Popconfirm,
  message,
  Avatar,
  Row,
  Col,
  Card,
  Skeleton,
  Button,
} from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import BottomAction from './BottomAction';
import { useRouter } from 'next/router';
import { useObserver } from 'mobx-react';
import UserAPI from '../../api/user';
import { AppContext } from '../App/context';
import { toJS } from 'mobx';

const { Meta } = Card;

const ProfileCard = (props) => {
  return useObserver(() => {
    const router = useRouter();
    const global = React.useContext(AppContext);
    const { userId } = router.query;

    return (
      <Row>
        <Card
          style={{ width: '100%', marginTop: 16, marginBottom: 20 }}
          actions={[
            <BottomAction
              icon={
                <SettingOutlined style={{ marginRight: '8px' }} key='setting' />
              }
              title='활동 점수'
              value={props.data.activityScore || 0}
            />,
            <BottomAction
              icon={<EditOutlined style={{ marginRight: '8px' }} key='edit' />}
              title='팔로잉'
              value={props.data.followingList.cnt || 0}
              onClick={() => {
                props.onClickFollow('following');
              }}
            />,
            <BottomAction
              icon={
                <EllipsisOutlined
                  style={{ marginRight: '8px' }}
                  key='ellipsis'
                />
              }
              title='팔로워'
              value={props.data.followedList.cnt || 0}
              onClick={() => {
                props.onClickFollow('followers');
              }}
            />,
          ]}
        >
          <Skeleton loading={props.loading} avatar active>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Meta
                avatar={
                  <>
                    <Avatar
                      src={
                        props.data.profileImg ||
                        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                      }
                      size='large'
                    />
                  </>
                }
                title={props.data.userId || ''}
                description={
                  <a
                    style={{ textDecoration: 'underline' }}
                    href={props.data.gitAddr}
                    target='_blank'
                  >
                    {props.data.gitAddr || '-'}
                  </a>
                }
              />
              <div>
                {userId == global.state.user.userId ? (
                  <Button
                    onClick={() => {
                      router.push('/profile/edit');
                    }}
                  >
                    프로필 수정
                  </Button>
                ) : (
                  <>
                    {props.data?.followedList?.followed_users.find(
                      (d) => d.userId === global.state.user.userId,
                    ) ? (
                      <Popconfirm
                        placement='bottomRight'
                        title='팔로우를 취소하시겠습니까?'
                        onConfirm={() => {
                          UserAPI.unfollow({
                            data: {
                              followed_id: userId,
                              following_id: global.state.user.userId,
                            },
                          });
                          // message.info("팔로우가 취소됬습니다.");
                        }}
                        okText='확인'
                        cancelText='취소'
                      >
                        <Button type='primary' style={{ marginRight: '8px' }}>
                          팔로우
                        </Button>
                      </Popconfirm>
                    ) : (
                      <Button
                        type='primary'
                        style={{ marginRight: '8px' }}
                        onClick={() => {
                          UserAPI.follow({
                            data: {
                              followed_id: userId,
                              following_id: global.state.user.userId,
                            },
                          });
                          props.onUpdate();
                        }}
                      >
                        팔로우하기
                      </Button>
                    )}
                    <Button onClick={props.onOpenNote}>쪽지 보내기</Button>
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
