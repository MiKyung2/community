import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const CONFIG = (() => {
  // let API_BASE_URL = "http://141.164.41.213:8081";
  let API_BASE_URL = 'https://toyproject.okky.kro.kr:8443';
  const API_VERSION = 'v1';
  const IMAGE_BASE_URL = '';

  let NODE_ENV;
  let LOG = (value) => {
    console.log(value);
  };

  switch (publicRuntimeConfig.env) {
    case 'development':
      NODE_ENV = 'development';
      break;

    case 'test':
      NODE_ENV = 'test';
      break;

    case 'debug':
      NODE_ENV = 'debug';
      break;

    case 'production':
    default:
      LOG = (value) => {};
      NODE_ENV = 'production';
  }

  API_BASE_URL = API_BASE_URL + '/' + API_VERSION + '/api';

  return {
    API_BASE_URL,
    IMAGE_BASE_URL,
    NODE_ENV,
    API_VERSION,
    LOG,
  };
})();

export const mapClickMaxLevel = 2;
export default CONFIG;
