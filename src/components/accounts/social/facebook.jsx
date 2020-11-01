import * as React from 'react';
import FacebookLogin from 'react-facebook-login';

const Facebook = () => {
  const FACEBOOK_ID = '';
  const responseFacebook = () => { };
  const autLoad = true;
  return (
    <FacebookLogin
      appId={FACEBOOK_ID}
      autoLoad={autLoad}
      fields="name,email,picture"
      callback={responseFacebook}
      size="small"
    />
  );
};

export default Facebook;
