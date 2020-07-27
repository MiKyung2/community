import * as React from 'react';

import { useRouter, NextRouter } from 'next/router';

import { useLocalStore } from 'mobx-react-lite';
import { AppContext } from '../components/App/context';
import { ILoginProps } from '../pages/accounts/login';

const initializer = (props) => {
  return {
    loading: false,
    list: [],
    value: {
      nickname: '',
      userId: '',
      email: '',
      password: '',
      password2: '',
    },
  };
};

const action = (props, $) => {
  const router = useRouter();
  const app = React.useContext(AppContext);

  return {};
};

const useLogin = (props) => {
  const app = React.useContext(AppContext);
  const router = useRouter();

  const $ = useLocalStore(() => ({ state: initializer(props) }));
  const dispatch = action(props, $);

  return { state: $.state, dispatch };
};

export default useLogin;
