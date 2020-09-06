import { Button } from 'antd';
import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_ID } from './keys';

const Facebook = () => {
  const responseFacebook = (response) => {
    // console.log(response);
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_ID}
      autoLoad={true}
      fields='name,email,picture'
      callback={responseFacebook}
      size='small'
    />
  );
};

export default Facebook;
