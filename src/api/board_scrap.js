import instance from "./axiosWrapper";

const BoardScrapAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`board/scrap/${payload.userId}`);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (payload) => {
    try {
      const res = await instance.post(`board/scrap`, payload.data);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  delete: async (payload) => {
    try {
      const res = await instance.post('board/delete', payload.data);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
};

export default BoardScrapAPI;