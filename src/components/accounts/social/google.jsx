import { Button } from 'antd';
import GoogleLogin from 'react-google-login';
import { GoogleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
// import { GOOGLE_CLIENT_ID } from './keys';
import { GOOGLE_CLIENT_ID } from './keys-samaple';

const Google = () => {
  const sucessResponse = (response) => {
    console.log(response);
  };
  const failureResponse = (response) => {
    console.log(response);
  };
  return (
    <>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button
            style={{ width: 300 }}
            size='large'
            onClick={renderProps.onClick}
          >
            <GoogleOutlined />
            Login with Google
          </Button>
        )}
        buttonText='Login with Google'
        onSuccess={sucessResponse}
        onFailure={failureResponse}
      ></GoogleLogin>
    </>
  );
};

export default Google;
