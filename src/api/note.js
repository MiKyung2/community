import AxiosWrapper from "./axiosWrapper";

const NoteAPI = {
  sendList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`note/send?currentPage=${payload.page}&userId=${payload.userId}&size=20&gb=title`);
      console.log("res : ", JSON.stringify(res, null, 3));
      res.body.content.map((v) => (v.key = v.id));
      return res.body;
    } catch (error) {
      console.error(error);
    }
  },
  receiveList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        `note/receive?currentPage=${payload.page}&userId=${payload.userId}&size=20&gb=title`
      );
      console.log("res : ", JSON.stringify(res, null, 3));
      res.body.content.map((v) => (v.key = v.id));
      return res.body;
    } catch (error) {
      console.error(error);
    }
  },
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`note/detail/${payload.gb}/${payload.id}`);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (payload) => {
    try {
      const res = await AxiosWrapper.post("note/write", payload.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  remove: async (payload) => {
    try {
      const res = await AxiosWrapper.post("note/remove/bulk", payload.data);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};

export default NoteAPI;
