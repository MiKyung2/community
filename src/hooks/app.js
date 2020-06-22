import * as React from "react";
import NextApp, { AppContext as NextAppContext } from "next/app";
import { useLocalStore } from "mobx-react-lite";
import App from "next/app";
import cookie from "cookie";

const initializer = (props) => {
  const state = {
    status: { loading: false },
    user: {
      id: props.init?.user.id,
      name: props.init?.user.name,
      token: props.init?.user.token,
      level: props.init?.user.level,
    },
  };

  return state;
};

const dispatch = ($) => {
  const login = () => {
    $.state.user.token = "";
  };

  const logout = () => {
    $.state.user.token = "";
  };

  return {
    login,
    logout,
  };
};

const useApp = (props) => {
  const $ = useLocalStore(() => ({ state: initializer(props) }));

  const action = dispatch($);

  const app = { props, state: $.state, action };

  return app;
};

App.getInitialProps = async (appContext) => {
  const nextAppProps = await NextApp.getInitialProps(appContext);
  const ctx = appContext.ctx;

  const ssr = !!appContext.ctx.req;
  const ck = cookie.parse((ctx.req ? ctx.req.headers.cookie : document.cookie) ?? "");

  const token = ck.auth ?? "";

  return {
    ...nextAppProps,
    ssr, cookie,
    init: {
      user: {
        token,
      }
    },
  }
}

export default useApp;
