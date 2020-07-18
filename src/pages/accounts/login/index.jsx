import Link from 'next/link'

import { useObserver } from "mobx-react";
import styled from 'styled-components';

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import BaseForm from '../../../components/BaseForm';
import useLogin from '../../../hooks/login';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

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

const LoginPage = (props) => {
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
          <BaseForm.Email value={login.state.value.email} onChange={(value) => { login.state.value.email = value; }} />
          <BaseForm.password value={login.state.value.password} onChange={(value) => { login.state.value.password = value; }} />

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
            <Col><div className="login_logo"><FacebookOutlined /></div></Col>
            <Col><div className="login_logo"><GoogleOutlined /></div></Col>
            <Col><div className="login_logo">N</div></Col>
          </Row>
        </Form>
      </div >
    );
  });
}

export default styled(LoginPage)`
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