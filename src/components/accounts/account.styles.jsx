import styled from 'styled-components';
import { Card } from 'antd';

export const StyledSocialCard = styled(Card)`
  & {
    margin: auto auto;
    width: 300px;
    background: #f0f2f4;
  }
  .social-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn_social {
    font-size: 40px;
    margin-left: 20px;
  }
`;
