import Link from 'next/link';

import { useObserver, useLocalStore } from 'mobx-react';
import styled from 'styled-components';

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';

// import useApp from '../../hooks/app';
import AuthAPI from '../../api/auth';

const Signup = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        loading: false,
        list: [],
        value: {
          nickname: '',
          id: '',
          email: '',
          password1: '',
          password2: '',
        },
      };
    });

    const onSignup = async () => {
      await AuthAPI.signup();
    };
  

    return (
      <div className={props.className}>
        <h1 className='title'>LOGO</h1>
        <Form

          initialValues={{
            remember: true,
          }}
          onFinish={() => onSignup()}
          onFinishFailed={() => {
            console.log('onFinishFailed');
          }}
        >
          <div className='wrapper'>
            <Form.Item 
              className='center form-item'
              // name='nickname'
              // rules={[
              //   {
              //     type: 'nickname',
              //     message: 'The input is not valid nickname!',
              //   },
              //   {
              //     required: true,
              //     message: 'Please input your nickname!',
              //   },
              // ]}
            >
              <Input
                className='input'
                placeholder='활동 닉네임'
                value={state.value.nickname}
                onChange={(e) => {
                  state.value.nickname = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item className='center form-item' >
              <Input
                className='input input-id'
                placeholder='아이디를 입력해주세요'
                value={state.value.id}
                onChange={(e) => {
                  state.value.id = e.target.value;
                }}
              />
              <Button className='button-id' type='primary'>
                중복 확인
              </Button>
            </Form.Item>
            <Form.Item className='center form-item' >
              <Input
                className='input'
                placeholder='이메일을 입력해주세요'
                value={state.value.email}
                onChange={(e) => {
                  state.value.email = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item className='center form-item'>
              <Input
                className='input'
                type='password'
                placeholder='영문 + 숫자 조합 8자리 이상'
                value={state.value.password1}
                onChange={(e) => {
                  state.value.password1 = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item className='center form-item'>
              <Input
                className='input'
                type='password'
                placeholder='비밀번호를 확인'
                value={state.value.password2}
                onChange={(e) => {
                  state.value.password2 = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item valuePropName='checked'>
              <Checkbox>개인 정보 취급 방침 동의</Checkbox>
              <Link href='signup/privacy'>
                <a className='privacy'>보기</a>
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                className='button'
                type='primary'
                htmlType='submit'
              >
                회원 가입
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  });
};``

export default styled(Signup)`
  & {
    height: 75vh;
    overflow: scroll;
    .title {
      font-size: 2.3rem;
      text-align: center;
      margin-bottom: 20px;
    }
    .wrapper {
      margin: 15px auto;
      width: 300px;
      .form-item {
        margin-bottom: 15px;
      }
      .input {
        height: 40px;
      }
      .input-id {
        width: 205px;
        margin-right: 10px;
      }
      .button-id {
        height: 38px;
      }
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .privacy {
      float: right;
      text-decoration: underline;
    }
    .button {
      width: 100%;
      height: 40px;
    }
  }
`;
