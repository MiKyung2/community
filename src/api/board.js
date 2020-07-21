import AxiosWrapper from "./axiosWrapper";

const BoardAPI = {
  list: async (payload) => {

    const {gb, keyword, offset, pageNumber, pageSize, sort} = payload;

    try {
      const res = await AxiosWrapper.get(
        `board/page?gb=${gb}&keyword=${keyword}&offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
      );
      // const res = await AxiosWrapper.get(
      //   `/board/page?pageNumber=10` + `&title=${payload.title}`
      // );

      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default BoardAPI;
