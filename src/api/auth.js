import axios from 'axios';
import AxiosWrapper from './axiosWrapper';

const AuthAPI = {
  signup:  async (payload) => {
    try {
      const res = await AxiosWrapper.post('/user', {
        nickname: payload.value.nickname,
        password: payload.value.password1,
        userId: payload.value.email,
      });

      return res;
    } catch (error) {
      throw error;
    }
  },

  login: async (payload) => {
    try {
      const res = await AxiosWrapper.post('/user/login', {
        id: payload.value.email,
        password: payload.value.password,
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  logout: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        'board/page?gb=title&keyword=title&offset=10&pageNumber=1&pageSize=10&sort=title',
      );
      // const res = await AxiosWrapper.get(
      //   `/board/page?pageNumber=10˝` + `&title=${payload.title}`
      // );

      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthAPI;
