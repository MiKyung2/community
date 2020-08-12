import * as React from "react";
import FollowTab from "../../components/profile/FollowTab";
import UserAPI from "../../api/user";
import { useObserver, useLocalStore } from "mobx-react";

const Follower = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        tabActive: "2",
        list: props?.list?.followed_users,
      };
    });

    React.useEffect(() => {
      if (state.tabActive === "1") {
        (async () => {
          try {
            const followingListRes = await UserAPI.followingList({ userId: 20 });
            state.list = followingListRes.following_users;
          } catch(error){
            console.error(error);
          }
        })();
      } else if (state.tabActive === "2") {
        (async () => {
          try {
            const followerListRes = await UserAPI.followerList({ userId: 20 });
            state.list = followerListRes.followed_users;
          } catch(error){
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
        }}
      />
    );
  });
};

Follower.getInitialProps = async () => {
  const followerListRes = await UserAPI.followerList({ userId: 20 });

  return {
    list: followerListRes,
  };
};

export default Follower;
