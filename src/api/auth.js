import axios from 'axios';
import AxiosWrapper from './axiosWrapper';
import CONFIG from "../utils/CONFIG";

const AuthAPI = {
  signup: async (payload) => {
    try {
      const res = await AxiosWrapper.post('/user', {
        nickname: payload.value.nickname,
        password: payload.value.password1,
        userId: payload.value.email,
        email: payload.value.email,
      });

      return res;
    } catch (error) {
      throw error;
    }
  },

  login: async (payload) => {
    try {
      const res = await axios.post(
        `${CONFIG.API_BASE_URL}/user/login`,
        {
          id: payload.value.email,
          password: payload.value.password,
        },
      );
      return res;
    } catch (error) {
      return '500';
    }
  },
  logout: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        'board/page?gb=title&keyword=title&offset=10&pageNumber=1&pageSize=10&sort=title',
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  find_email: async () => {},
  find_pass: async (payload) => {
    try {
      const res = await axios.get(
        `${CONFIG.API_BASE_URL}/user/find/password?user_id=${payload}`,
        // {
        //   user_id: payload,
        // },
      );
      return res;
    } catch (error) {
      console.log(error);
      return '500';
    }
  },
};

export default AuthAPI;
