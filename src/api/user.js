import instance from "./axiosWrapper";
import CONFIG from "../utils/CONFIG";
import testUserData from "../data/user";

const UserAPI = {
  get: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return testUserData.profile;
      } else {
        const res = await instance.get(`user/${payload.id}`);
        return res.data;
      }
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  put: async (payload) => {
    try {
      const res = await instance.put("user");
      return res;
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  putPassword: async (data) => {
    try {
      const res = await instance.put("user/password", data);
      return res;
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  followingList: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return testUserData.followingList;
      } else {
        const res = await instance.get(
          `user/following?following_id=${payload.userId}`
        );
        return res.data.body.followingList;
      }
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  followerList: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return testUserData.followedList;
      } else {
        const res = await instance.get(
          `user/follower?followed_id=${payload.userId}`
        );
        return res.data.body.followedList;
      }
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  follow: async (data) => {
    try {
      const res = await instance.post("user/follow", data);
      return res;
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  unfollow: async (data) => {
    try {
      const res = await instance.delete("user/unfollow", data);
      return res;
    } catch (error) {
      CONFIG.ERROR(error);
    }
  }
};

export default UserAPI;
