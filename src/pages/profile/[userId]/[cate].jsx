import * as React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';

import FollowTab from '../../../components/profile/FollowTab';
import UserAPI from '../../../api/user';

const Follower = (props) => {
  return useObserver(() => {
    const router = useRouter();
    const { id } = router.query;
    const state = useLocalStore(() => {
      return {
        tabActive: props?.cate,
        list: props?.list?.followed_users,
      };
    });

    React.useEffect(() => {
      if (state.tabActive === 'following') {
        (async () => {
          try {
            const followingListRes = await UserAPI.followingList({ userId: id });
            state.list = followingListRes.following_users;
          } catch (error) {
            console.error(error);
          }
        })();
      } else if (state.tabActive === 'followers') {
        (async () => {
          try {
            const followerListRes = await UserAPI.followerList({ userId: id });
            state.list = followerListRes.followed_users;
          } catch (error) {
            console.error(error);
          }
        })();
      }
    }, [state.tabActive]);

    return (
      <FollowTab
        data={state.list || []}
        tabActive={state.tabActive}
        onChange={(value) => {
          state.tabActive = value;
          router.replace('/profile/[id]/[cate]', `/profile/${id}/${value}`);
        }}
      />
    );
  });
};

Follower.getInitialProps = async (ctx) => {
  const { id, cate } = ctx.query;

  let list = null;
  if (cate === 'following') list = await UserAPI.followingList({ userId: id });
  else if (cate === 'followers') list = await UserAPI.followerList({ userId: id });

  return {
    cate,
    list,
  };
};

export default Follower;
