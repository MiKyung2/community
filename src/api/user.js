import AxiosWrapper from "./axiosWrapper";
import CONFIG from "../utils/CONFIG";
import testUserData from "../data/user";

const UserAPI = {
  get: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return testUserData.profile;
      } else {
        const res = await AxiosWrapper.get(`user/${payload.id}`);
        return res;
      }
    } catch (error) {
      console.error(error);
    }
  },
  put: async (payload) => {
    try {
      const res = await AxiosWrapper.put("user");
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  putPassword: async (payload) => {
    try {
      const res = await AxiosWrapper.put("user/password", payload.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  followingList: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return testUserData.followingList;
      } else {
        const res = await AxiosWrapper.get(
          `user/following?following_id=${payload.userId}`
        );
        return res.body.followingList;
      }
    } catch (error) {
      console.error(error);
    }
  },
  followerList: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return testUserData.followedList;
      } else {
        const res = await AxiosWrapper.get(
          `user/follower?followed_id=${payload.userId}`
        );
        return res.body.followedList;
      }
    } catch (error) {
      console.error(error);
    }
  },
  follow: async (payload) => {
    try {
      const res = await AxiosWrapper.post(payload.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  unfollow: async (payload) => {
    try {
      const res = await AxiosWrapper.delete(payload.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
};

export default UserAPI;
