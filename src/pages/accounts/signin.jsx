import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import {
  Form, Input, Button, Row, Col, message,
} from 'antd';
import { OuterWrapper } from '../../styles/styles';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';
import { inputRules } from '../../components/accounts/validator';
import FindPassModal from '../../components/accounts/FindPassModal';

import GoogleBtn from '../../components/accounts/social/google';

const SignIn = (props) => {
  const global = React.useContext(AppContext);
  const router = useRouter();
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        loading: false,
        list: [],
        value: {
          userId: '',
          password: '',
        },
      };
    });

    const [visible, setVisible] = React.useState(false);

    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

    const onLogin = async () => {
      try {
        const resAuth = await AuthAPI.login(state);
        if (resAuth.data.code === 200) {
          const { access_token, refresh_token } = resAuth.data.body;
          setCookie('access_token', access_token);
          setCookie('refresh_token', refresh_token);
          global.action.login(resAuth.data.body);
        }
      } catch (e) {
        return message.error('아이디 혹은 비밀번호를 확인해주세요.');
      }
    };

    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        onLogin();
      }
    };

    useEffect(() => {
      if (cookies.access_token) {
        Router.push('/');
      }
    }, [cookies.access_token]);

    const formItemMaker = (name) => (
      <Form.Item
        className="center"
        name={name}
        rules={name === 'userId' ? inputRules.userId : null}
      >
        <Input
          className="input"
          type={name.includes('userId') ? 'text' : 'password'}
          value={
            name.includes('userId') ? state.value.userId : state.value.password
          }
          placeholder={
            name.includes('userId')
              ? '아이디를 입력해주세요'
              : '패스워드를 입력해주세요'
          }
          onChange={(e) => {
            e.preventDefault();
            name === "password"
              ? (state.value.password = e.target.value)
              : (state.value.userId = e.target.value);
          }}
          autoComplete="off"
          onKeyDown={onKeyDown}
        />
      </Form.Item>
    );

    return (
      <>
        {!cookies.access_token ? (
          <OuterWrapper className={props.className}>
            <Form
              name="basic"
              onFinish={() => {
                onLogin();
              }}
            >
              <div className="wrapper">
                {formItemMaker('userId')}
                {formItemMaker('password')}
                <Form.Item className="form-item">
                  <Button className="button" type="primary" onClick={onLogin}>
                    로그인
                  </Button>
                </Form.Item>
                <Form.Item className="form-item">
                  <GoogleBtn />
                </Form.Item>
                <Form.Item className="form-item">
                  <Button
                    className="button"
                    onClick={() => router.push('/accounts/signup')}
                  >
                    회원가입
                  </Button>
                </Form.Item>
              </div>
              <Row className="right lost_info_wrapper">
                <Col>
                  <p className="find_pass" onClick={() => setVisible(true)}>
                    비밀번호 찾기
                  </p>
                  <FindPassModal visible={visible} setVisible={setVisible} />
                </Col>
              </Row>
            </Form>
            {/* <SocialMeiaLoginCard /> */}
          </OuterWrapper>
        ) : null}
      </>
    );
  });
};

export default SignIn;
