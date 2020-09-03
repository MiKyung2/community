import styled from 'styled-components';
import { Card } from 'antd';

export const StyledSocialCard = styled(Card)`
  & {
    margin: auto auto auto auto;
    height: 250px;
  }
  .social-wrapper {
    margin: auto auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 150px;
  }

  .btn_social {
    font-size: 60px;
  }

  .facebook {
    :hover {
      font-size: 65px;
      color: #178fff;
    }
  }
  .google {
    :hover {
      font-size: 65px;
      color: #ea4235;
    }
  }
  .github {
    :hover {
      font-size: 65px;
      color: #302f2f;
    }
  }
  .naver {
    :hover {
      font-size: 65px;
      color: #19cd5f;
    }
  }
`;
