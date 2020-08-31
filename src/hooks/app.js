import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import App from 'next/app';
import Axios from "axios";
import jwt from "jsonwebtoken";
import CONFIG from '../utils/CONFIG';
import { instance } from "../api/axiosWrapper";


const initializer = (props) => {
  const state = {
    status: { loading: false },
    user: {
      id: props.init?.user?.id,
      token: props.init?.user?.token,
      userId: props.init?.user?.userId,
    },
  };

  return state;
};

const dispatch = ($) => {
  const login = (data) => {
    $.state.user.id = data?.userPkId;
    $.state.user.token = data?.token;
    $.state.user.usreId = data?.userId;
  };

  const logout = () => {
    $.state.user.token = null;
    $.state.user.userId = "";
    $.state.user.id = 0;
  };

  return {
    login,
    logout,
  };
};

const useApp = (props) => {
  const $ = useLocalStore(() => ({ state: initializer(props) }));

  const action = dispatch($);

  instance.interceptors.request.use((reqConfig) => {
    const isServerUrls = [
      CONFIG.API_BASE_URL,
    ].some((url) => reqConfig.url?.includes(url) ?? false);
    if (isServerUrls && $.state.user.token && $.state.user.token !== "undefined") {
      reqConfig.headers.Authorization = $.state.user.token;
    }

    return reqConfig;
  });


  instance.interceptors.response.use(
    (res) => {
      console.log("interceptors");
      const token = res.headers?.["x-authorization-update"] ?? "";
      if (token) {
        $.state.user.token = token;

        const decodedJwt = jwt.decode(token.replace("Bearer ", ""));
      }

      return res;
    },
    (err) => {
      if (err?.response?.status === 401) {
        $.state.user.token = "";
        $.state.user.level = "none";
        notification.open("인증 에러가 발생했습니다.", { containerId: "global", id: notification.ID.unauthorized });
      }

      return Promise.reject(err);
    },
  );

  const app = { props, state: $.state, action };

  return app;
};

export default useApp;
