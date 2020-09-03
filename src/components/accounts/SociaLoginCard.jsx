import React from 'react';
import {
  FacebookOutlined,
  GoogleOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { StyledSocialCard } from './account.styles';

const SocialLogin = () => {
  const socialLogin = (type) => {
    window.location.href =
      'https://toyproject.okky.kro.kr:8443/oauth2/authorization/' + type;
  };
  return (
    <StyledSocialCard>
      <div className='social-wrapper'>
        <FacebookOutlined
          className='btn_social'
          onClick={() => socialLogin('facebook')}
        />
        <GoogleOutlined
          className='btn_social'
          onClick={() => socialLogin('google')}
        />
        <GithubOutlined
          className='btn_social'
          onClick={() => socialLogin('github')}
        />
        <span href='javascript:;' className='btn_social' data-social='naver'>
          N
        </span>
      </div>
    </StyledSocialCard>
  );
};

export default SocialLogin;
