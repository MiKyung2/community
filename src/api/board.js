import instance from './axiosWrapper';

const BoardAPI = {
  list: async (payload) => {
    try {
      const {
        boardType, currentPage, gb, keyword, size, sort,
      } = payload;
      const res = await instance.get(`board/page?boardType=${boardType}&currentPage=${currentPage}&gb=${gb}&keyword=${keyword}&size=${size}&sort=${sort}`);
      return res.data;
    } catch (error) {
      // throw error;
      console.error(error);
    }
    return false;
  },
  detail: async (payload) => {
    try {
      const { id } = payload;
      const res = await instance.get(`board/detail/${id}`);
      return res.data;
    } catch (error) {
      // throw error;
      console.error(error);
    }
    return false;
  },
  write: async (payload) => {
    try {
      const res = await instance.post('board/write', payload);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
    return false;
  },
  edit: async (payload) => {
    try {
      const res = await instance.post('board/edit', payload);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
    return false;
  },
  event: async (payload) => {
    try {
      const res = await instance.post('board/event/like', payload);
      return res.data;
    } catch (error) {
      // throw error;
      console.error(error);
    }
    return false;
  },
  delete: async (payload) => {
    try {
      const res = await instance.post('board/delete', payload);
      return res;
    } catch (error) {
      // throw error;
      console.error(error);
    }
    return false;
  },
};

export default BoardAPI;
