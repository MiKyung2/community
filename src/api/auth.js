import axios from 'axios';
import AxiosWrapper from './axiosWrapper';

const AuthAPI = {
  signup: async (payload) => {
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
      const res = await axios.post(
        'http://141.164.41.213:8081/v1/api/user/login',
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
      // const res = await AxiosWrapper.get(
      //   `/board/page?pageNumber=10˝` + `&title=${payload.title}`
      // );

      return res;
    } catch (error) {
      throw error;
    }
  },
  find_pass: async (payload) => {
    console.log('start');
    try {
      const res = await axios.put(
        `http://141.164.41.213:8081/v1/api/user/find/password?id=1&user_id=${payload.value.email}`,
        // {
        //   id: '1',
        //   user_id: payload.value.email,
        // },
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return '500';
    }
  },
};

export default AuthAPI;
