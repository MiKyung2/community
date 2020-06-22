import axios from "axios";

const serverURL = "http://13.125.209.154:8081";
const VERSION = "/v1";
const baseURL = serverURL + VERSION + "/api";

export const instance = axios.create({
  baseURL,
});


axios.interceptors.response.use((response) => {
  return response;
}), (error) => {
  switch (error.response.status) {
    case 401:
      // 로그인이 필요합니다.
      break;
    case 403:
      // 권한 없음
      break;
    case 404:
      // 없는 페이지
      break;
    case 410:
      // 더 이상 존재하지 않는 페이지
      break;
    default:
      // 예상치 못한 에러
      break;
  }
  return Promise.reject(error);
};
