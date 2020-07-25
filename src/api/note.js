import AxiosWrapper from "./axiosWrapper";

const NoteAPI = {
  sendList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`note/send?userId=${payload.userId}`);

      return res;
    } catch (error) {
      throw error;
    }
  },
  receiveList: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        `note/receive?userId=${payload.userId}`
      );

      return res;
    } catch (error) {
      throw error;
    }
  },
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`note/${payload.id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
  post: async (payload) => {
    try {
      const res = await AxiosWrapper.post("note/", payload.data);
      return res;
    } catch (error) {
      throw error;
    }
  },
  put: async (payload) => {
    try {
      const res = await AxiosWrapper.put("note/", payload.data);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default NoteAPI;
