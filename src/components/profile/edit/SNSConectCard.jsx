import React from 'react';
import { Card } from 'antd';
import {
  FacebookOutlined,
  GoogleOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { StyledSocialCard } from './edit.styles';

const SnsCard = () => {
  const socialLogin = (type) => {};
  return (
    <StyledSocialCard title='sns 연결'>
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
        <span
          href='javascript:;'
          className='btn_social naver'
          data-social='naver'
        >
          N
        </span>
      </div>
    </StyledSocialCard>
  );
};

export default SnsCard;
