import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import App from 'next/app';


const initializer = (props) => {
  const state = {
    status: { loading: false },
    user: {
      id: '',
      email: '',
      name: '',
      token: '',
      level: '',
    },
  };

  return state;
};

const dispatch = ($) => {
  const login = (data) => {
    $.state.user.id = data?.userPkId;
    $.state.user.token = data?.token;
  };

  const logout = () => {
    $.state.user.token = null;
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
