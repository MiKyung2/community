import styled from 'styled-components';

export const OuterWrapper = styled.div`
  & {
    height: 75vh;
    margin-top: 50px;
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
    .form-item {
      margin: 12px 0;
      :nth-child(5) {
        margin-bottom: 30px;
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
    .find_pass {
      cursor: pointer;
      &:hover {
        color: skyblue;
        cursor: pointer;
      }
    }
  }
`;
