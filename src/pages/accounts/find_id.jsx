import React, { useEffect } from 'react';
import Router from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';

const FindId = (props) => {
  const global = React.useContext(AppContext);
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        loading: false,
        list: [],
        value: {
          email: '',
          password: '',
        },
      };
    });
    const [setCookie] = useCookies(['token', 'id']);

    const onLogin = async () => {
      const resAuth = await AuthAPI.login(state);
      if (resAuth === '500') {
        message.error('회원정보를 다시 한 번 확인해 주세요');
        return;
      }
      global.action.login(resAuth.data.body);
    };

    useEffect(() => {
      if (global.state.user?.token) {
        Router.push('/');
        setCookie('token', global.state.user?.token);
        setCookie('id', global.state.user?.id);
      }
    }, [global.state.user?.token]);

    return (
      <div className={props.className}>
        <h1 className='center'>아이디 찾기에 관해서는 논의가 필요하다</h1>
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          // onFinish={() => onLogin()}
          onFinishFailed={() => { }}
        >
          <div className='wrapper'>
            <Form.Item
              className='center'
              name='email'
              rules={[
                {
                  required: true,
                  message: '이메일을 입력해주세요.',
                },
              ]}
            >
              <Input
                className='input'
                id='email'
                value={state.value.email}
                placeholder='이메일을 입력해주세요'
                onChange={(e) => {
                  state.value.email = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className='button'
                type='primary'
                htmlType='submit'
                onClick={() => onLogin()}
                disabled
              >
                아이디 찾기
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  });
};

export default styled(FindId)`
  & {
    height: 75vh;
    overflow: scroll;
    .title {
      font-size: 2.3rem;
      text-align: center;
      margin-bottom: 100px;
    }
    .wrapper {
      margin: 15px auto;
      width: 300px;
      .input {
        height: 40px;
      }
    }
    .button {
      width: 100%;
      height: 40px;
      margin: -20px 0;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .login_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: black;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    .lost_info_wrapper {
      margin: -15px auto 0 auto;
      width: 300px;
    }
    .vertical-line {
      margin: 0 5px;
      height: 14px;
      width: 1.2px;
      background-color: black;
    }
  }
`;
