import styled from 'styled-components';
import { Card } from 'antd';

export const StyledSocialCard = styled(Card)`
  & {
    margin: auto auto;
    /* width: 300px;
    background: #f0f2f4; */
    height: 170px;
  }
  .social-wrapper {
    margin: auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  .btn_social {
    font-size: 50px;
    margin-left: 35px;
  }

  .facebook {
    :hover {
      font-size: 55px;
      color: #178fff;
    }
  }
  .google {
    :hover {
      font-size: 55px;
      color: #ea4235;
    }
  }
  .github {
    :hover {
      font-size: 55px;
      color: #302f2f;
    }
  }
  .naver {
    :hover {
      font-size: 55px;
      color: #19cd5f;
    }
  }
`;
