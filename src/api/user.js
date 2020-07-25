import AxiosWrapper from "./axiosWrapper";

const UserAPI = {
  get: async (payload) => {
    try {
      const res = await AxiosWrapper.get(`user/${payload.id}`);

      return res;
    } catch (error) {
      throw error;
    }
  },
  put: async (payload) => {
    try {
      const res = await AxiosWrapper.put("user");
      return res;
    } catch (error) {
      throw error;
    }
  },
  putPassword: async (data) => {
    try {
      const res = await AxiosWrapper.put("user/password", data);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default UserAPI;
