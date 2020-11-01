import instance from './axiosWrapper';

const BoardRecentAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`board/recent/${payload.userId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return false;
  },
};

export default BoardRecentAPI;
