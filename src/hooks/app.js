import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import App from 'next/app';
import Axios from "axios";
import jwt from "jsonwebtoken";
import CONFIG from '../utils/config';
import instance from "../api/axiosWrapper";
import { toJS } from "mobx";

const initializer = (props) => {
  const state = {
    status: { loading: false },
    user: {
      token: props.init?.user?.token,
      userId: props.init?.user?.userId,
      role: props.init?.user?.role,
    },
    alarm: {
      note: false,
      board: false,
      profile: false,
    }
  };
  return state;
};

const dispatch = ($) => {
  const login = (data) => {
    $.state.user.token = data?.token;
    $.state.user.userId = data?.userId;
    $.state.user.role = data?.role;
  };

  const logout = () => {
    $.state.user.token = null;
    $.state.user.userId = '';
    $.state.user.role = "";
  };

  return {
    login,
    logout,
  };
};

const useApp = (props) => {
  const $ = useLocalStore(() => ({ state: initializer(props) }));

  const action = dispatch($);

  React.useMemo(() => {
    instance.interceptors.request.use((reqConfig) => {
      const isServerUrls = [
        CONFIG.API_BASE_URL,
      ].some((url) => reqConfig.url?.includes(url) ?? false);

      if ($.state.user.token && $.state.user.token !== "undefined") {
        reqConfig.headers.Authorization = $.state.user.token;
      }

      return reqConfig;
    });


    instance.interceptors.response.use(
      (res) => {
        const token = res.headers?.["x-authorization-update"] ?? "";
        if (token) {
          $.state.user.token = token;

          const decodedJwt = jwt.decode(token.replace("Bearer ", ""));
          // $.state.user.token = "level";
        }

        return res;
      },
      (err) => {
        if (err?.response?.status === 401) {
          $.state.user.token = "";
          $.state.user.level = "none";
        }

        return Promise.reject(err);
      },
    );

  });

  const app = { props, state: $.state, action };

  return app;
};

export default useApp;
