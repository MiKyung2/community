import instance from "./axiosWrapper";

const AuthAPI = {
  signup: async (payload) => {
    try {
      const res = await instance.post(
        'user',
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
    return await instance.post(
      'user/login',
      {
        id: payload.value.userId,
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
      const res = await instance.get(
        `user/check/id/${userId}`,
      );
      return res;
    } catch (error) {
      return '500';
    }
  },
  check_email: async (email) => {
    try {
      const res = await instance.get(
        `user/check/email/${email}`,
      );
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
      const res = await instance.put(
        `user/password`,
        data,
        config,
      );
      return res;
    } catch (error) {
      console.log(error);
      return '500';
    }
  },
  edit_user_info: async (data, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // 1. 프로필 수정 안 했을 때 url to file (빈 값이 있으면 안 되기 때문)
      // 2. 프로필 수정 했을 때 파일을 변경해서 던져야 하는 경우 프로파일

      // api 나뉨

      // const imageData = data[3].value.file[0];
      // console.log('이미지 데이터: ', imageData);

      const formdata = new FormData();
      formdata.append('userId', data.nickname);
      formdata.append('nickname', data.nickname);
      formdata.append('gitAddr', data.gitAddr);
      // formdata.append('file', data.dragger[0].originFileObj);
      formdata.append('id', '49');

      const res = await instance.put(
        `user`,
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
