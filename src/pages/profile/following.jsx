import FollowTab from "../../components/profile/FollowTab";
import UserAPI from "../../api/user";

const Following = (props) => {
  // {
  //   key: 1,
  //   id: 1,
  //   nickname: "xowns9418",
  //   image: "",
  //   type: "following",
  // },

  return (
    <FollowTab
      data={props?.list?.following_users || []}
      tabActive={"1"}
      onChange={(value) => {
        console.log("change : ", value);
      }}
    />
  );
};

Following.getInitialProps = async () => {
  const followingListRes = await UserAPI.followingList({ userId: 20 });

  return {
    list: followingListRes,
  };
};

export default Following;
