import instance from "./axiosWrapper";
import CONFIG from '../utils/config';
import {dummy} from '../data/dummy';

 // `board/page?gb=${gb}&keyword=${keyword}&offset=${offset}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`


const BoardAPI = {
  list: async (payload) => {
    try {
      if (CONFIG.NODE_ENV == "test") {
        return dummy;
      } else {
      const {currentPage, gb, keyword, size, sort} = payload;
      const res = await instance.get(
        `board/page?currentPage=${currentPage}&gb=${gb}&keyword=${keyword}&size=${size}&sort=${sort}`
        );
      return res ? res.data : dummy;
      }
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
  write: async (payload) => {
    try {
      const res = await instance.post('board/write', payload);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  edit: async (payload) => {
    try {
      const res = await instance.post('board/edit', payload);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  event: async (payload) => {
    try {
      const res = await instance.post('board/event/like', payload);
      return res.data;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
  delete: async (payload) => {
    try {
      const res = await instance.post('board/delete', payload);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
  },
};

export default BoardAPI;
