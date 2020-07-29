import AxiosWrapper from "./axiosWrapper";

const UserAPI = {
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`user/${payload.id}`);

      return res;
    } catch (error) {
      throw error;
    }
  },
  put: async (payload) => {
    try {
      const res = await AxiosWrapper.put("user");
      return res;
    } catch (error) {
      throw error;
    }
  },
  putPassword: async (payload) => {
    try {
      const res = await AxiosWrapper.put("user/password", payload.data);
      return res;
    } catch (error) {
      throw error;
    }
  },
  followingList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        `user/following/following_id=${payload.userId}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  followerList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        `user/follower/followed_id=${payload.userId}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default UserAPI;
