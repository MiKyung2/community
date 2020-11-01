import styled from 'styled-components';
import { Card } from 'antd';

const StyledSocialCard = styled(Card)`
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
    margin-left: 25px;
  }
  .facebook {
    :hover {
      font-size: 45px;
      color: #178fff;
    }
  }
  .google {
    :hover {
      font-size: 45px;
      color: #ea4235;
    }
  }
  .github {
    :hover {
      font-size: 45px;
      color: #302f2f;
    }
  }

  .naver {
    :hover {
      font-size: 45px;
      color: #19cd5f;
    }
  }
`;

export { StyledSocialCard as default };
