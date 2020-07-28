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
      // throw error;
      console.error(error);
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
      // throw error;
      console.error(error);
    }
  },
  write: async (payload) => {

    try {
      const res = await AxiosWrapper.post('board/write', payload);

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  detail: async (payload) => {

    const {id} = payload;

    console.log("detail api - id", id)

    try {
      const res = await AxiosWrapper.get(
        `board/page?${id}`
      );
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
};

export default BoardAPI;
