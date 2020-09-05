import instance from "./axiosWrapper";

const MyBoardAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`board/userid/${payload.userId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default MyBoardAPI;
