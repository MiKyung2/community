import instance from './axiosWrapper';

const BoardScrapAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`board/scrap/${payload.userId}?currentPage=${payload.data.currentPage}&size=${payload.data.size}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return false;
  },
  post: async (payload) => {
    return instance.post('board/scrap', payload.data);
  },
  delete: async (payload) => {
    return instance.post('board/scrap/delete', payload.data);
  },
};

export default BoardScrapAPI;
