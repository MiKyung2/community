import FollowTab from "../../components/profile/FollowTab";
import UserAPI from "../../api/user";

const Follower = () => {
  return (
    <FollowTab
      data={[
        {
          key: 1,
          id: 1,
          nickname: "xowns9418",
          image: "",
          type: "following",
        },
        {
          key: 2,
          id: 2,
          nickname: "Hello World",
          image: "",
          type: "followers",
        },
        {
          key: 3,
          id: 3,
          nickname: "aaabbkk",
          image: "",
          type: "following",
        },
      ]}
      tabActive={"2"}
      onChange={(value) => {
        console.log("change : ", value);
      }}
    />
  );
};

Follower.getInitialProps = async () => {
  // try {
  //   const list = UserAPI.followerList({ userId: 1 });
  //   return {
  //     list: list.body.follower_list,
  //   };
  // } catch (error) {
  //   console.error("error : ", error);
  // }
};

export default Follower;
