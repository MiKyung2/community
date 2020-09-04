import styled from 'styled-components';
import { Result } from 'antd';

const SignUpComplete = (props) => {
  const title = '회원가입이 완료되었습니다.';
  const subTitle = (
    <p className='sub-title'>
      회원님이 등록하신 메일로 인증메일이 발송되었습니다.
      <br />
      <br />
      이메일을 확인하신 후, 이메일에 포함된 인증링크를 클릭하시면 이메일인증이
      완료됩니다.
    </p>
  );

  return (
    <div className={props.className}>
      <Result title={title} subTitle={subTitle} />
    </div>
  );
};

export default styled(SignUpComplete)`
  & {
    * {
      margin-bottom: 20px;
    }
    .sub-title {
      margin: 45px 0;
    }
  }
`;
