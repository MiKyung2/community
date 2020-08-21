import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import styled from 'styled-components';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';

const FindPwd = (props) => {
  const global = React.useContext(AppContext);
  const router = useRouter();
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        loading: false,
        value: {
          email: '',
        },
      };
    });

    const onFindPassword = async () => {
      const resAuth = await AuthAPI.find_pass(state);

      // if (resAuth === '500') {
      //   message.error('회원정보를 다시 한 번 확인해 주세요');
      //   return;
      // }
    };

    useEffect(() => {
      if (global.state.user?.token) {
        Router.push('/');
      }
    }, [global.state.user?.token]);

    return (
      <div className={props.className}>
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          // onFinish={() => onLogin()}
          onFinishFailed={() => {
            console.log('onFinishFailed');
          }}
        >
          <div className='wrapper'>
            <Form.Item className='center' name='email'>
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
                onClick={() => onFindPassword()}
              >
                비밀번호 찾기
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  });
};

export default styled(FindPwd)`
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
