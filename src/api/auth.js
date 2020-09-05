import instance from './axiosWrapper';

const AuthAPI = {
  signup: async (payload) => {
    try {
      const res = await instance.post('user', {
        nickname: '',
        userId: payload.value.userId,
        email: payload.value.email,
        password: payload.value.password1,
      });
      return res;
    } catch (error) {
      throw error;
    }
  },

  login: async (payload) => {
    return await instance.post(
      'user/login',
      {
        userId: payload.value.userId,
        password: payload.value.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },
  logout: async (payload) => {
    try {
      const res = await instance.get(
        'board/page?gb=title&keyword=title&offset=10&pageNumber=1&pageSize=10&sort=title',
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  check_userId: async (userId) => {
    try {
      const res = await instance.get(`user/check/id/${userId}`);
      return res;
    } catch (error) {
      return '500';
    }
  },
  check_email: async (email) => {
    try {
      const res = await instance.get(`user/check/email/${email}`);
      return res;
    } catch (error) {
      return '500';
    }
  },
  find_email: async () => {},
  find_pass: async (payload) => {
    try {
      const res = await instance.get(
        `user/find/password?user_id=${payload}`,
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
  change_pass: async (userId, newPassword) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = {
        userId,
        newPassword,
      };
      const res = await instance.put(`user/password`, data, config);
      return res;
    } catch (error) {
      console.log(error);
      return '500';
    }
  },
  edit_user_info: async (data) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const formdata = new FormData();
      formdata.append('userId', data.userId);
      formdata.append('nickname', data.nickname);
      formdata.append('gitAddr', data.gitAddr);
      const res = await instance.put(`user`, formdata, config);

      return res;
    } catch (error) {
      return '500';
    }
  },
  edit_user_image: async (image, userId) => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      };
      const formdata = new FormData();
      formdata.append('file', image[0].originFileObj);
      formdata.append('userId', userId);
      const res = await instance.put(`profile`, formdata, config);
      return res;
    } catch (error) {
      return '500';
    }
  },
  withdraw: async (userId) => {
    try {
      const res = await instance.delete(`user/${userId}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthAPI;
