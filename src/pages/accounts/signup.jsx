import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import AuthAPI from '../../api/auth';
import { inputRules, regExp } from '../../components/accounts/validator';
import PolicyModal from '../../components/accounts/PolicyModal';

const Signup = (props) => {
  return useObserver(() => {
    const router = useRouter();

    const state = useLocalStore(() => {
      return {
        loading: false,
        confirm: false,
        value: {
          userId: '',
          id: '',
          email: '',
          password1: '',
          password2: '',
        },
      };
    });

    const [isUserIdUnique, setIsUserIdUnique] = useState(false);
    const [isEmailUnique, setIsEmailUnique] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    const checkUserIdDuplication = async () => {
      const res = await AuthAPI.check_userId(state.value.userId);
      if (state.value.userId.match(regExp.checkUserId)) {
        if (res?.data?.msg === '존재하지 않는 유저 입니다.') {
          message.success('사용가능한 아이디입니다.');
          setIsUserIdUnique(true);
        } else {
          message.error('이미 사용중인 아이디입니다.');
          setIsUserIdUnique(false);
        }
      }
      if (!state.value.userId.match(regExp.checkUserId)) {
        message.error('영문, 한글, 숫자 조합 입력가능');
      }
    };

    // const checkEmailDuplication = async () => {
    //   const res = await AuthAPI.check_email(state.value.email);
    //   if (state.value.email.match(regExp.checkEmail)) {
    //     if (res?.data?.msg === '존재하지 않는 유저 입니다.') {
    //       message.success('사용가능한 이메일입니다.');
    //       setIsEmailUnique(true);
    //     } else {
    //       message.error('이미 사용중인 이메일입니다.');
    //       setIsEmailUnique(false);
    //     }
    //   }
    //   if (!state.value.email.match(regExp.checkEmail)) {
    //     message.error('올바른 이메일을 입력해주세요');
    //   }
    // };

    const onSignup = async () => {
      if (confirm && isUserIdUnique) {
        state.loading = true;
        if (
          state.value.userId &&
          // state.value.id &&
          state.value.email &&
          state.value.password1 &&
          state.value.password2
        ) {
          const resAuth = await AuthAPI.signup(state);
          if (resAuth.data.code === '200') {
            router.push({
              pathname: '/accounts/result/complete',
            });
          }
          if (resAuth.data.code === '500') {
            router.push('/accounts/result/fail');
            state.loading = false;
          }
        } else message.info('모든 빈 칸에 입력을 부탁드립니다.');
      }
      if (!confirm) {
        message.info('개인 정보 취급에 동의 부탁드립니다.');
      }
      if (!isUserIdUnique) {
        message.info('아이디 중복 확인 부탁드립니다.');
      }
    };

    if (state.loading) {
      return (
        <div className={props.className}>
          <h1 className='title'>Loading...</h1>
          <h3 className='title'>3~4초의 시간이 소요됩니다.</h3>
        </div>
      );
    }

    return (
      <div className={props.className}>
        <h1 className='title'>LOGO</h1>
        <Form
          form={form}
          onFinish={() => onSignup()}
          onFinishFailed={() => {
            console.log('onFinishFailed');
          }}
        >
          <div className='wrapper'>
            {/* <Form.Item
              className='center form-item'
              name={['user', 'userId']}
              rules={inputRules.userId}
            >
              <Input
                className='input'
                placeholder='활동 닉네임'
                value={state.value.userId}
                onChange={(e) => {
                  state.value.userId = e.target.value;
                }}
                autoComplete='off'
              />
            </Form.Item> */}
            <Form.Item
              className='center form-item'
              name={['user', 'userId']}
              rules={inputRules.userId}
            >
              <div style={{ display: 'flex' }}>
                <Input
                  className='input'
                  type='text'
                  name='email'
                  placeholder='유저 이이디를 입력해주세요'
                  style={{ width: 200 }}
                  value={state.value.userId}
                  onChange={(e) => {
                    state.value.userId = e.target.value;
                  }}
                  autoComplete='off'
                />
                <Button
                  className='button-id'
                  type='primary'
                  onClick={() => checkUserIdDuplication()}
                >
                  중복 확인
                </Button>
              </div>
            </Form.Item>
            <Form.Item
              className='center form-item'
              name={['user', 'email']}
              rules={inputRules.email}
            >
              <div style={{ display: 'flex' }}>
                <Input
                  className='input'
                  type='text'
                  name='email'
                  placeholder='이메일을 입력해주세요'
                  style={{ width: 200 }}
                  value={state.value.email}
                  onChange={(e) => {
                    state.value.email = e.target.value;
                  }}
                  autoComplete='off'
                />
                <Button
                  className='button-id'
                  type='primary'
                  onClick={() => checkEmailDuplication()}
                  disabled
                >
                  중복 확인
                </Button>
              </div>
            </Form.Item>

            <Form.Item
              className='center form-item'
              name={['password']}
              rules={inputRules.password}
              hasFeedback
              autoComplete='off'
            >
              <Input
                className='input'
                type='password'
                placeholder='영문, 숫자, 특수문자 포함 8자리 이상'
                value={state.value.password1}
                onChange={(e) => {
                  state.value.password1 = e.target.value;
                }}
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item
              className='center form-item'
              name='confirm'
              dependencies={['password']}
              hasFeedback
              rules={inputRules.passwordCheck}
            >
              <Input
                className='input'
                type='password'
                placeholder='비밀번호를 확인'
                value={state.value.password2}
                onChange={(e) => {
                  state.value.password2 = e.target.value;
                }}
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
                onChange={(e) => {
                  setConfirm(e.target.checked);
                }}
                checked={confirm}
              >
                개인 정보 취급 방침 동의
              </Checkbox>
              <p className='privacy' onClick={() => setVisible(true)}>
                보기
              </p>
              <PolicyModal visible={visible} setVisible={setVisible} />
            </Form.Item>
            <Form.Item>
              <Button className='button' type='primary' htmlType='submit'>
                회원 가입
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  });
};
``;

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
        margin-left: 18px;
        width: 80px;
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
