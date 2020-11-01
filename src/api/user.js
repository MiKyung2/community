import instance from './axiosWrapper';
import CONFIG from '../utils/CONFIG';

const UserAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`user/${payload.userId}`);
      return res.data;
    } catch (error) {
      CONFIG.ERROR(error);
    }
    return false;
  },
  put: async () => {
    return instance.put('user');
  },
  putPassword: async (data) => {
    return instance.put('user/password', data);
  },
  followingList: async (payload) => {
    try {
      const res = await instance.get(
        `user/following?following_id=${payload.userId}`,
      );
      return res.data.body.followingList;
    } catch (error) {
      CONFIG.ERROR(error);
    }
    return false;
  },
  followerList: async (payload) => {
    try {
      const res = await instance.get(
        `user/follower?followed_id=${payload.userId}`,
      );
      return res.data.body.followedList;
    } catch (error) {
      CONFIG.ERROR(error);
    }
    return false;
  },
  follow: async (data) => {
    return instance.post('user/follow', data);
  },
  unfollow: async (data) => {
    return instance.put('user/unfollow', data);
  },
};

export default UserAPI;
