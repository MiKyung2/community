import axios from 'axios';
import AxiosWrapper from './axiosWrapper';
import CONFIG from '../utils/CONFIG';

const AuthAPI = {
  signup: async (payload) => {
    try {
      const res = await axios.post(
        'https://toyproject.okky.kro.kr:8443/v1/api/user',
        {
          nickname: payload.value.userId,
          userId: payload.value.userId,
          email: payload.value.email,
          password: payload.value.password1,
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
          id: payload.value.userId,
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
  check_userId: async (userId) => {
    try {
      const res = await axios.get(
        `https://toyproject.okky.kro.kr:8443/v1/api/user/check/${userId}`,
      );
      return res;
    } catch (error) {
      return '500';
    }
  },
  check_email: async (email) => {
    try {
      const res = await axios.get(
        `https://toyproject.okky.kro.kr:8443/v1/api/user/check/${email}`,
      );
      return res;
    } catch (error) {
      return '500';
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

      // 1. 프로필 수정 안 했을 때 url to file (빈 값이 있으면 안 되기 때문)
      // 2. 프로필 수정 했을 때 파일을 변경해서 던져야 하는 경우 프로파일

      // api 나뉨

      const formdata = new FormData();
      formdata.append(
        'file',
        fileInput.files[0],
        'Screen Shot 2020-08-16 at 12.15.07 PM.png',
      );
      formdata.append('gitAddr', 'https://github.com/sbin0819');
      formdata.append('id', '35');
      formdata.append('nickname', '호소보');
      formdata.append('userId', 'sbinha123@gmail.com');

      const res = await axios.put(
        `https://toyproject.okky.kro.kr:8443/v1/api/user`,
        formdata,
        config,
      );
      console.log('유저 인포 수정 어스', res);
      return res;
    } catch (error) {
      return '500';
    }
  },
};

export default AuthAPI;
