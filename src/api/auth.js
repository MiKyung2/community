import axios from 'axios';
import AxiosWrapper from './axiosWrapper';

const AuthAPI = {
  signup: async (payload) => {
    try {
      const res = await axios.post(
        'https://toyproject.okky.kro.kr:8443/v1/api/user',
        {
          nickname: payload.value.nickname,
          password: payload.value.password1,
          userId: payload.value.email,
          email: payload.value.email,
        },
      );
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  },

  login: async (payload) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        'https://toyproject.okky.kro.kr:8443/v1/api/user/login',
        {
          id: payload.value.email,
          password: payload.value.password,
        },
        config,
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
        `http://141.164.41.213:8081/v1/api/user/find/password?user_id=${payload}`,
      );
      return res;
    } catch (error) {
      console.log(error);
      return '500';
    }
  },
  change_pass: async (id, newPassword) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = {
        id,
        newPassword,
      };
      const res = await axios.put(
        `https://toyproject.okky.kro.kr:8443/v1/api/user/password`,
        data,
        config,
      );
      return res;
    } catch (error) {
      console.log(error);
      return '500';
    }
  },
  edit_user_info: async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const body = new FormData();
      body.set('file', file);
      body.set('gitAddr', gitAddr);
      body.set('id', id);
      body.set('nickname', nickname);
      body.set('userId', userId);

      const data = {
        id: id,
        newPassword: password,
      };
      const res = await axios.put(
        `https://toyproject.okky.kro.kr:8443/v1/api/user`,
        data,
        config,
      );
      return res;
    } catch (error) {
      return '500';
    }
  },
};

export default AuthAPI;
