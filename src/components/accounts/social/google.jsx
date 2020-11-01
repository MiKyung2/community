import * as React from 'react';
import { Button } from 'antd';
import GoogleLogin from 'react-google-login';
import { GoogleOutlined } from '@ant-design/icons';
import { GOOGLE_CLIENT_ID } from './keys-sample';
// import { GOOGLE_CLIENT_ID } from './keys';

const Google = () => {
  const sucessResponse = (response) => {
    console.log(response);
  };
  const failureResponse = (response) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={(renderProps) => {
        return (
          <Button
            style={{ width: 300 }}
            size="large"
            onClick={renderProps.onClick}
          >
            <GoogleOutlined />
            Login with Google
          </Button>
        );
      }}
      buttonText="Login with Google"
      onSuccess={sucessResponse}
      onFailure={failureResponse}
    />
  );
};

export default Google;
