import instance from "./axiosWrapper";
import CONFIG from "../utils/CONFIG";

const UserAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`user/${payload.userId}`);
      return res.data;
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
      const res = await instance.get(
        `user/following?following_id=${payload.userId}`
      );
      return res.data.body.followingList;
    } catch (error) {
      CONFIG.ERROR(error);
    }
  },
  followerList: async (payload) => {
    try {
      const res = await instance.get(
        `user/follower?followed_id=${payload.userId}`
      );
      return res.data.body.followedList;
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
      const res = await instance.put("user/unfollow", data);
      return res;
    } catch (error) {
      CONFIG.ERROR(error);
    }
  }
};

export default UserAPI;
