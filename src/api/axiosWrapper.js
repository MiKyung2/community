import axios from 'axios';
import { message } from 'antd';
import CONFIG from '../utils/CONFIG';

const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
});

export const handleSuccess = (response) => {
  // CONFIG.INFO(`${response.data.code}: ${response.data.msg}`)
  // CONFIG.INFO(response.data.body);
  return response;
};

export const handleError = (error) => {
  CONFIG.ERROR(`${error.response?.data?.code}: ${error.response?.data?.msg}`);

  switch (error.response?.data?.codes) {
    case 401:
      message.log('로그인이 필요합니다.');
      break;
    case 403:
      message.log('권한이 없습니다.');
      break;
    case 404:
      message.log('찾을 수 없는 페이지 입니다.');
      break;
    case 410:
      message.log('더 이사 존재하지 않는 페이지입니다.');
      break;
    default:
      break;
  }

  return Promise.reject(error);
};

instance.defaults.headers.common.Authoriztion = '';
instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
