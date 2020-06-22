import Link from 'next/link'

import { useObserver } from "mobx-react";
import styled from 'styled-components';

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import useLogin from '../../../hooks/login';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = (props) => {
  return useObserver(() => {
    const login = useLogin(props);

    return (
      <div className={props.className}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={() => { console.log("finish") }}
          onFinishFailed={() => { console.log("onFinishFailed") }}
        >
          <Form.Item
            label="아이디"
            name="email"
            rules={[
              {
                required: true,
                message: '이메일을 입력해주세요.',
              },
            ]}
          >
            <Input
              id="email"
              value={login.state.value.email}
              onChange={(e) => {
                login.state.value.email = e.target.value;
              }}
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요.',
              },
            ]}
          >
            <Input.Password
              id="password"
              value={login.state.value.password}
              onChange={(e) => {
                login.state.value.password = e.target.value;
              }}
            />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>로그인 유지</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={() => {
              console.log("email : ", login.state.value.email);
              console.log("password : ", login.state.value.password);
            }}>로그인</Button>
          </Form.Item>

          <Row className="center">
            <Col className="signup_txt">계정이 없으신가요? <Link href="signup"><a>회원가입</a></Link></Col>
          </Row>
          <Row className="center">
            <Col className="lostpw_txt"><Link href="password/reset"><a>비밀번호를 잊으셨나요?</a></Link></Col>
          </Row>
          <Row className="center">
            <Col><div className="login_logo">F</div></Col>
            <Col><div className="login_logo">g</div></Col>
            <Col><div className="login_logo">N</div></Col>
          </Row>
        </Form>
      </div>
    );
  });
}

export default styled(Login)`
  & {
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