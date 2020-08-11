import AxiosWrapper from "./axiosWrapper";
import {CONFIG} from '../utils/CONFIG';

 // `board/page?gb=${gb}&keyword=${keyword}&offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`


const BoardAPI = {
  list: async (payload) => {

    const {gb, sort} = payload;

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

    // CONFIG.LOG("detail api - id", id)

    try {
      const res = await AxiosWrapper.get(
        `board/detail/${id}`
      );
      // CONFIG.LOG("detail api - res", res);
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

    CONFIG.LOG("edit payload", payload);

    try {
      const res = await AxiosWrapper.post('board/edit', payload);

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  delete: async (payload) => {

    CONFIG.LOG("delete id", payload)

    try {
      const res = await AxiosWrapper.post('board/delete', payload);

      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
};

export default BoardAPI;
