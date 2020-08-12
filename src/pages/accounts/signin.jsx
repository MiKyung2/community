import React, { useEffect } from 'react'
import Link from 'next/link';
import Router from 'next/router'
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import styled from 'styled-components';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';

const SignIn = (props) => {
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
    const [_, setCookie] = useCookies(['token', 'id']);

    const onLogin = async () => {
      const resAuth = await AuthAPI.login(state);
      global.action.login(resAuth.body);
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
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={() => onLogin()}
          onFinishFailed={() => {
            console.log('onFinishFailed');
          }}
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
                onChange={(e) => {
                  state.value.email = e.target.value;
                }}
              />
            </Form.Item>

            <Form.Item
              className='center'
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력해주세요.',
                },
              ]}
            >
              <Input.Password
                className='input'
                type='password'
                value={state.value.password}
                onChange={(e) => {
                  state.value.password = e.target.value;
                }}
              />
            </Form.Item>

            <Form.Item valuePropName='checked'>
              <Checkbox>로그인 유지</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                className='button'
                type='primary'
                htmlType='submit'
              // onClick={() => {}}
              >
                로그인
              </Button>
            </Form.Item>
          </div>
          <Row className='center'>
            <Col className='signup_txt'>
              계정이 없으신가요?{' '}
              <Link href='signup'>
                <a>회원가입</a>
              </Link>
            </Col>
          </Row>
          <Row className='center'>
            <Col className='lostpw_txt'>
              <Link href='password/reset'>
                <a>비밀번호를 잊으셨나요?</a>
              </Link>
            </Col>
          </Row>
          {/* <Row className='center'>
            <Col>
              <div className='login_logo'>F</div>
            </Col>
            <Col>
              <div className='login_logo'>g</div>
            </Col>
            <Col>
              <div className='login_logo'>N</div>
            </Col>
          </Row> */}
        </Form>
      </div>
    );
  });
};

export default styled(SignIn)`
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
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
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
  }
`;
