import { Tabs, Modal } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import UserAPI from '../../api/user';
import { AppContext } from '../../components/App/context';
import SendNote from '../../components/note/SendNote';
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileTabList from '../../components/profile/ProfileList';
const { TabPane } = Tabs;
import { toJS } from 'mobx';
import FollowTab from '../../components/profile/FollowTab';
import BoardRecentAPI from '../../api/board_recent';

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
            user: '',
          },
        },
        profile: props.profile,
        follow: {
          loading: false,
          active: 'following',
          open: false,
          list: [],
        },
        tab: {
          active: 'recent',
          recent: {
            list: props.theLatestDate,
            loading: false,
          },
          board: {
            list: [],
            loading: false,
          },
          scrap: {
            list: [],
            loading: false,
          },
        },
      };
    });

    const getProfile = async () => {
      try {
        const profileRes = await UserAPI.get({ id: router.query.id });
        if (profileRes.code != 200) return;
        
        state.profile = profileRes.body;
      } catch (error) {
        console.error(error);
      }
    };

    const getFollowingList = async () => {
      state.follow.loading = true;
      try {
        const followingListRes = await UserAPI.followingList({
          userId: router.query.id,
        });
        state.follow.list = followingListRes.following_users;
      } catch (error) {
        console.error(error);
      } finally {
        state.follow.loading = false;
      }
    };

    const getFollowerList = async () => {
      state.follow.loading = true;
      try {
        const followerListRes = await UserAPI.followerList({
          userId: router.query.id,
        });
        state.follow.list = followerListRes.followed_users;
      } catch (error) {
        console.error(error);
      } finally {
        state.follow.loading = false;
      }
    };
  
    const getBoardRecent = async () => {
      state.tab.recent.loading = true;
      try {
        const boardRecentRes = await BoardRecentAPI.get({ id: router.query.id });
        state.tab.recent.list = boardRecentRes.body;
      } catch (e) {

      } finally {
        state.tab.recent.loading = false;
      }
    };
  
    const getTabList = () => {
      switch (state.tab.active) {
        case "recent":
          getBoardRecent();
          return;

        case "board":
          return;

        case "scrap":
          return;
      }
    };

    React.useEffect(() => {
      if (!state.follow.open) return;

      if (state.follow.active === 'following') {
        getFollowingList();
      } else if (state.follow.active === 'followers') {
        getFollowerList();
      }
    }, [state.follow.open, state.follow.active]);

    React.useEffect(() => {
      getTabList();
    }, [state.tab.active]);

    React.useEffect(() => {
      if (global.props.ssr) return;

      getProfile();
    }, []);

    return (
      <div className={props.className}>
        <Modal
          visible={state.follow.open}
          onCancel={() => {
            state.follow.open = false;
          }}
          footer={null}
        >
          <FollowTab
            loading={state.follow.loading}
            data={state.follow.list || []}
            tabActive={state.follow.active}
            onChange={(value) => {
              state.follow.active = value;
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
            state.follow.active = category;
          }}
        />

        {/* 게시물 탭 */}
        <Tabs
          large='true'
          type='card'
          defaultActiveKey={state.tab.active}
          activeKey={state.tab.active}
          onChange={(active) => {
            state.tab.active = active;
          }}
        >
          <TabPane tab='최근 활동' key='recent'>
            <ProfileTabList loading={state.tab.recent.loading} dataSource={state.tab.recent.list} />
          </TabPane>
          <TabPane tab='게시물' key='board'>
            <ProfileTabList loading={state.tab.board.loading} dataSource={state.tab.board.list} />
          </TabPane>
          <TabPane tab='스크랩' key='scrap'>
            <ProfileTabList loading={state.tab.scrap.loading} dataSource={state.tab.scrap.list} />
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
  const boardRecentRes = await BoardRecentAPI.get({ id: ctx.query.id });

  return {
    profile: profileRes.body,
    theLatestDate: boardRecentRes.body,
  };
};

export default styled(ProfilePage)`
  & {
  }
`;
