import AxiosWrapper from "./axiosWrapper";

const BoardAPI = {
  list: async (payload) => {

    const {gb, sort} = payload;

    try {
      const res = await AxiosWrapper.get(
        // `board/page?gb=${gb}&keyword=${keyword}&offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
        `board/page?gb=${gb}&sort=${sort}`
      );

      return res;
    } catch (error) {
      throw error;
    }
  },
  search: async (payload) => {

    const {gb, sort, keyword} = payload;

    try {
      const res = await AxiosWrapper.get(
        // `board/page?gb=${gb}&keyword=${keyword}&offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
        `board/page?gb=${gb}&sort=${sort}&keyword=${keyword}`
      );

      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default BoardAPI;
