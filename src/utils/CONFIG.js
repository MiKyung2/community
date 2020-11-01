import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const CONFIG = (() => {
  let API_BASE_URL = '';
  const URL = 'https://toyproject.okky.kro.kr:8443';
  const API_VERSION = 'v1';
  const IMAGE_BASE_URL = '';

  let NODE_ENV;
  const ConsoleFunction = (value) => {
    console.log(value);
  };
  let LOG = ConsoleFunction;
  let INFO = ConsoleFunction;
  let WARN = ConsoleFunction;
  let ERROR = ConsoleFunction;

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
      LOG = () => {};
      INFO = () => {};
      WARN = () => {};
      ERROR = () => {};
      NODE_ENV = 'production';
  }

  API_BASE_URL = `${URL}/${API_VERSION}/api`;

  return {
    URL,
    API_BASE_URL,
    IMAGE_BASE_URL,
    NODE_ENV,
    API_VERSION,
    LOG,
    INFO,
    WARN,
    ERROR,
  };
})();

export default CONFIG;
