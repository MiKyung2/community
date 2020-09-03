import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Checkbox, Row, Col, message, Card } from 'antd';
import { OuterWrapper } from '../../styles/styles';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';
import { inputRules } from '../../components/accounts/validator';
import { toJS } from 'mobx';
import FindPassModal from '../../components/accounts/FindPassModal';

import SocialMeiaLoginCard from '../../components/accounts/SociaLoginCard';

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

    const [_, setCookie] = useCookies(['token', 'id']);

    // 사인 버튼 누르고 skeleton 추가
    // 1.5 초 안에 반응 없을 때 잘 못 된 방식이라는 메시지 추가

    const onLogin = async () => {
      try {
        const resAuth = await AuthAPI.login(state);
        if (resAuth.data.code == 200) {
          global.action.login(resAuth.data.body);
        }
      } catch (e) {
        message.error('아이디 혹은 비밀번호를 확인해주세요.');
        return;
      }
    };

    useEffect(() => {
      if (global.state.user?.token) {
        Router.push('/');
        setCookie('token', global.state.user?.token);
        setCookie('id', global.state.user?.id);
      }
    }, [global.state.user?.token]);

    const formItemMaker = (name) => (
      <Form.Item
        className='center'
        name={name}
        rules={name === 'userId' ? inputRules.userId : null}
      >
        <Input
          className='input'
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
            name === 'password'
              ? (state.value.password = e.target.value)
              : (state.value.userId = e.target.value);
          }}
          autoComplete='off'
        />
      </Form.Item>
    );

    return (
      <OuterWrapper className={props.className}>
        <Form
          name='basic'
          onFinish={() => {
            onLogin();
          }}
        >
          <div className='wrapper'>
            {formItemMaker('userId')}
            {formItemMaker('password')}
            <Form.Item>
              <Button
                className='button'
                type='primary'
                htmlType='submit'
                onClick={onLogin}
              >
                로그인
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className='button'
                htmlType='submit'
                onClick={() => router.push('/accounts/signup')}
              >
                회원가입
              </Button>
            </Form.Item>
          </div>
          <Row className='right lost_info_wrapper'>
            <Col>
              <p className='find_pass' onClick={() => setVisible(true)}>
                비밀번호 찾기
              </p>
              <FindPassModal visible={visible} setVisible={setVisible} />
            </Col>
          </Row>
        </Form>
        <SocialMeiaLoginCard />
      </OuterWrapper>
    );
  });
};

export default SignIn;
