import instance from "./axiosWrapper";

const NoteAPI = {
  sendList: async (payload) => {
    try {
      const res = await instance.get(`note/send?currentPage=${payload.page}&userId=${payload.userId}&size=${payload.pageSize}&gb=title`);
      res.data.body.content.map((v) => (v.key = v.id));
      return res.data.body;
    } catch (error) {
      console.error(error);
    }
  },
  receiveList: async (payload) => {
    try {
      const res = await instance.get(
        `note/receive?currentPage=${payload.page}&userId=${payload.userId}&size=${payload.pageSize}&gb=title`
      );
      res.data.body.content.map((v) => (v.key = v.id));
      return res.data.body;
    } catch (error) {
      console.error(error);
    }
  },
  get: async (payload) => {
    try {
      const res = await instance.get(`note/detail/${payload.gb}/${payload.id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (payload) => {
    try {
      const res = await instance.post("note/write", payload.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  remove: async (payload) => {
    try {
      const res = await instance.post("note/remove/bulk", payload.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};

export default NoteAPI;
