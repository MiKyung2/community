import React, { useEffect } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { OuterWrapper } from './styles';
import AuthAPI from '../../api/auth';
import { AppContext } from '../../components/App/context';
import { inputRules } from '../../components/accounts/validator';

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

    const [_, setCookie] = useCookies(['token', 'id']);

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

    const formItemMaker = (name) => (
      <Form.Item
        className='center'
        name={name}
        rules={name === 'email' ? inputRules.email : null}
      >
        <Input
          className='input'
          type={name === 'password' ? 'password' : 'text'}
          value={name === 'password' ? state.value.password : state.value.email}
          placeholder='이메일을 입력해주세요'
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
              <Link href='find_id'>
                <a>이메일 찾기</a>
              </Link>
            </Col>
            <Col className='vertical-line' />
            <Col>
              <Link href='find_pwd'>
                <a>비밀번호 찾기</a>
              </Link>
            </Col>
          </Row>
        </Form>
      </OuterWrapper>
    );
  });
};

export default SignIn;
