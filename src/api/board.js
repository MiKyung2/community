import AxiosWrapper from "./axiosWrapper";

 // `board/page?gb=${gb}&keyword=${keyword}&offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`


const BoardAPI = {
  list: async (payload) => {

    const {gb, sort} = payload;
<<<<<<< HEAD

    try {
      const res = await AxiosWrapper.get(
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
        `board/page?gb=${gb}&sort=${sort}&keyword=${keyword}`
      );

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  detail: async (payload) => {

    const {id} = payload;

    // console.log("detail api - id", id)

    try {
      const res = await AxiosWrapper.get(
        `board/detail/${id}`
      );
      // console.log("detail api - res", res);
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
  edit: async (payload) => {

    console.log("edit payload", payload);

    try {
      const res = await AxiosWrapper.post('board/edit', payload);

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  delete: async (payload) => {

    console.log("delete id", payload)

    try {
      const res = await AxiosWrapper.post('board/delete', payload);
=======

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
>>>>>>> d2dbf70... 게시판 메인 화면 정렬 draft 완료

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
<<<<<<< HEAD
=======
    }
  },
  write: async (payload) => {

    try {
      const res = await AxiosWrapper.post('board/write', payload);

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
>>>>>>> e2df469... edit accounts
    }
  },
};

export default BoardAPI;
