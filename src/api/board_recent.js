import AxiosWrapper from "./axiosWrapper";

const BoardRecentAPI = {
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`board/recent/${payload.userId}`);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
};

export default BoardRecentAPI;
