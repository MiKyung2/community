import axios from 'axios';
import CONFIG from '../utils/CONFIG';
import { Alert } from 'antd';

export const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
});

const handleSuccess = (response) => {
  return response;
};

const handleError = (error) => {
  switch (error?.response?.status) {
    case 401:
      // 로그인이 필요합니다.
      console.log('error 401, 로그인이 필요합니다.');
          
      <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
      />
      break;
    case 403:
      // 권한 없음
      console.log('error 403, 권한이 없습니다.');
      break;
    case 404:
      // 없는 페이지
      console.log('error 404, 찾을 수 없는 페이지 입니다.');
      break;
    case 410:
      // 더 이상 존재하지 않는 페이지
      console.log('error 410, 더 이사 존재하지 않는 페이지입니다.');
      break;
    default:
      // 예상치 못한 에러
      <Alert
        message="예상치 못한 에러가 발생했습니다."
        description="새로고침하여 다시 시도해주세요."
        type="error"
        showIcon
      />
      console.log('error, 예상치 못한 에러가 발생했습니다.');
      break;
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(handleSuccess, handleError);

const AxiosWrapper = {
  async get(url, config) {
    const res = await instance.get(url, config);
    return res.data;
  },
  async post(url, data, config) {
    const res = await instance.post(url, data, config);
    return res.data;
  },
  async put(url, data, config) {
    const res = await instance.put(url, data, config);
    return res.data;
  },
  async patch(url, data, config) {
    const res = await instance.patch(url, data, config);
    return res.data;
  },
  async delete(url, config) {
    const res = await instance.delete(url, config);
    return res.data;
  },
};

export default AxiosWrapper;
