import styled from 'styled-components';
import { Card } from 'antd';

export const StyledSocialCard = styled(Card)`
  & {
    margin: auto auto;
    /* width: 300px;
    background: #f0f2f4; */
  }
  .social-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn_social {
    font-size: 50px;
    margin-left: 35px;
  }

  .facebook {
    :hover {
      color: #178fff;
    }
  }
  .google {
    :hover {
      color: #ea4235;
    }
  }
  .github {
    :hover {
      color: #302f2f;
    }
  }
  .naver {
    :hover {
      color: #19cd5f;
    }
  }
`;
