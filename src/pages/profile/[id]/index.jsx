import { Tabs, Modal } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import UserAPI from '../../../api/user';
import { AppContext } from '../../../components/App/context';
import SendNote from '../../../components/note/SendNote';
import ProfileCard from '../../../components/profile/ProfileCard';
import ProfileTabList from '../../../components/profile/ProfileList';
const { TabPane } = Tabs;
import { toJS } from "mobx";
import FollowTab from "../../../components/profile/FollowTab";

const ProfilePage = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const router = useRouter();
    const state = useLocalStore(() => {
      return {
        loading: false,
        send: {
          open: false,
          receiveUser: {
            id: 0,
            user: "",
          },
        },
        profile: props.profile,
        follow: {
          tabActive: "following",
          open: false,
          list: [],
        }
      };
    });

    React.useEffect(() => {
      if (global.state.srr) return;

      getProfile();
    }, []);

    const getProfile = () => {
      (async () => {
        const profileRes = await UserAPI.get({ id: router.query.id });
        state.profile = profileRes.body;
      })();
    };

    React.useEffect(() => {
      if (!state.follow.open) return;

      if (state.follow.tabActive === "following") {
        (async () => {
          try {
            const followingListRes = await UserAPI.followingList({ userId: router.query.id });
            state.follow.list = followingListRes.following_users;
          } catch(error){
            console.error(error);
          }
        })();
      } else if (state.follow.tabActive === "followers") {
        (async () => {
          try {
            const followerListRes = await UserAPI.followerList({ userId: router.query.id });
            state.follow.list = followerListRes.followed_users;
          } catch(error){
            console.error(error);
          }
        })();
      }
    }, [state.follow.open, state.follow.tabActive]);

    return (
      <div className={props.className}>
        <Modal
          visible={state.follow.open}
          onCancel={() => { state.follow.open = false; }}
          footer={null}
        >
          <FollowTab
            data={state.follow.list || []}
            tabActive={state.follow.tabActive}
            onChange={(value) => {
              state.follow.tabActive = value;
            }}
          />
        </Modal>

        {/* 프로필 상세 */}
        <ProfileCard
          loading={state.loading}
          data={state.profile}
          onOpenNote={() => {
            state.send.open = true;
          }}
          onUpdate={() => {
            getProfile();
          }}
          onClickFollow={(category) => { 
            state.follow.open = true;
            state.follow.tabActive = category;
          }}
        />

        {/* 게시물 탭 */}
        <Tabs large='true' type='card' defaultActiveKey='1'>
          <TabPane tab='최근 활동' key='1'>
            <ProfileTabList loading={false} dataSource={props.theLatestDate} />
          </TabPane>
          <TabPane tab='게시물' key='2'>
            <ProfileTabList loading={false} dataSource={props.theLatestDate} />
          </TabPane>
          <TabPane tab='스크랩' key='3'>
            <ProfileTabList loading={false} dataSource={props.theLatestDate} />
          </TabPane>
        </Tabs>

        <SendNote
          receiveUser={{
            id: state.profile.id,
            userId: state.profile.userId,
          }}
          visible={state.send.open}
          onCancel={() => {
            state.send.open = false;
          }}
        />
      </div>
    );
  });
};

ProfilePage.getInitialProps = async (ctx) => {
  const profileRes = await UserAPI.get({ id: ctx.query.id });
  
  return {
    profile: profileRes.body,
    theLatestDate: [
      {
        key: 1,
        boardId: 1,
        title: '게시물에 댓글을 남겼습니다.',
        description: '[모집중] 토이프로젝트 모집합니다.',
        time: '2분 전',
        user: {
          id: 1,
          nickname: '김코딩',
        },
      },
      {
        key: 2,
        boardId: 2,
        title: '게시물에 댓글을 남겼습니다.',
        description: '[모집중] 토이프로젝트 모집합니다.',
        time: '2분 전',
        user: {
          id: 1,
          nickname: '김코딩',
        },
      },
      {
        key: 3,
        boardId: 3,
        title: '게시물에 댓글을 남겼습니다.',
        description: '[모집중] 토이프로젝트 모집합니다.',
        time: '2분 전',
        user: {
          id: 1,
          nickname: '김코딩',
        },
      },
    ],
  };
};

export default styled(ProfilePage)`
  & {
  }
`;
