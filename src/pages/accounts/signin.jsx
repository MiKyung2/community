import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { OuterWrapper } from './styles';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';
import { inputRules } from '../../components/accounts/validator';
import { toJS } from 'mobx';
import FindPassModal from '../../components/accounts/FindPassModal';

const SignIn = (props) => {
  const global = React.useContext(AppContext);
  const router = useRouter();
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

    const [visible, setVisible] = React.useState(false);

    const [_, setCookie] = useCookies(['token', 'id']);

    const onLogin = async () => {
      try {
        const resAuth = await AuthAPI.login(state);
        if (resAuth.data.code == 200) {
          global.action.login(resAuth.data.body);
        }
      } catch (e) {
        if (e?.response?.status === 500) {
          return message.error('회원정보를 다시 한 번 확인해 주세요');
        }
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
        rules={name === 'email' ? inputRules.email : null}
      >
        <Input
          className='input'
          type={name.includes('email') ? 'text' : 'password'}
          value={
            name.includes('email') ? state.value.email : state.value.password
          }
          placeholder={
            name.includes('email')
              ? '이메일을 입력해주세요'
              : '패스워드를 입력해주세요'
          }
          onChange={(e) => {
            name === 'password'
              ? (state.value.password = e.target.value)
              : (state.value.email = e.target.value);
          }}
          autoComplete='off'
        />
      </Form.Item>
    );

    return (
      <OuterWrapper className={props.className}>
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinishFailed={() => {
            console.log('onFinishFailed');
            onLogin();
          }}
        >
          <div className='wrapper'>
            {formItemMaker('email')}
            {formItemMaker('password')}
            <Form.Item valuePropName='checked'>
              <Checkbox>로그인 유지</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                className='button'
                type='primary'
                htmlType='submit'
                onClick={() => onLogin()}
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
      </OuterWrapper>
    );
  });
};

export default SignIn;
