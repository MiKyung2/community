import AxiosWrapper from "./axiosWrapper";

const NoteAPI = {
  sendList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`note/send?userId=${payload.userId}`);

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  receiveList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        `note/receive?userId=${payload.userId}`
      );

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`note/${payload.id}`);
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
      const res = await AxiosWrapper.post(
        `note/remove/${payload.gb}/${payload.id}`
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};

export default NoteAPI;
