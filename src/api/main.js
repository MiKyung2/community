import instance from "./axiosWrapper";

const MainAPI = {
  list: async (payload) => {
    try {
      const {boardType} = payload;
      const res = await instance.get(
        `board/main?boardType=${boardType}`
        );
      
      return res.data
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  detail: async (payload) => {
    try {
      const {id} = payload;
      const res = await instance.get(
        `board/detail/${id}`
      );
      return res.data;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
};

export default MainAPI;
