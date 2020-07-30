import AxiosWrapper from "./axiosWrapper";

const UserAPI = {
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`user/${payload.id}`);

      return res;
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
      const res = await AxiosWrapper.get(
        `user/following/following_id=${payload.userId}`
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  followerList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        `user/follower/followed_id=${payload.userId}`
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};

export default UserAPI;
