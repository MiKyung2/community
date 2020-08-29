import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import App from 'next/app';

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
    $.state.user.userId = '';
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

  const app = { props, state: $.state, action };

  return app;
};

export default useApp;
