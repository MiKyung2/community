import FollowTab from "../../components/profile/FollowTab";

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

export default Follower;
