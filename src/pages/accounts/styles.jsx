import styled from 'styled-components';

export const OuterWrapper = styled.div`
  & {
    height: 75vh;
    overflow: scroll;
    .title {
      font-size: 2.3rem;
      text-align: center;
      margin-bottom: 100px;
    }
    .wrapper {
      margin: 15px auto;
      width: 300px;
      .input {
        height: 40px;
      }
    }
    .button {
      width: 100%;
      height: 40px;
      margin: -20px 0;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .login_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: black;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    .lost_info_wrapper {
      margin: -15px auto 0 auto;
      width: 300px;
    }
    .vertical-line {
      margin: 0 5px;
      height: 14px;
      width: 1.2px;
      background-color: black;
    }
  }
`;
