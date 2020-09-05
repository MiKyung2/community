import React from 'react';
import axios from 'axios';
import {
  FacebookOutlined,
  GoogleOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { StyledSocialCard } from './account.styles';

const SocialLogin = () => {
  const socialLogin = async (type) => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const response = await axios.get(
        `https://toyproject.okky.kro.kr:8443/oauth2/authorization/${type}`,
        null,
        config,
      );
    } catch (err) {
      console.log(err);
    }
    // window.location.href = `https://toyproject.okky.kro.kr:8443/oauth2/authorization/${type}`;
  };
  return (
    <StyledSocialCard>
      <div className='social-wrapper'>
        <FacebookOutlined
          className='btn_social facebook'
          onClick={() => socialLogin('facebook')}
        />
        <GoogleOutlined
          className='btn_social google'
          onClick={() => socialLogin('google')}
        />
        <GithubOutlined
          className='btn_social github'
          onClick={() => socialLogin('github')}
        />
        <span className='btn_social naver' onClick={() => socialLogin('naver')}>
          N
        </span>
      </div>
    </StyledSocialCard>
  );
};

export default SocialLogin;
