import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
const SignUpSuccess = (props) => {
  const router = useRouter();

  const title = `안녕하세요, ${router.query.nickname}님.`;
  const subTitle = (
    <p className='sub-title'>
      환영합니다! 회원가입이 정상적으로 이루어 졌습니다.
      <br />
      <br />
      로그인 하시면 홈페이지 내의 모든 서비스를 이용하실 수 있습니다.
      <br />
      <br />
      <br />
      <h3>
        <span style={{ color: 'blue' }}>{router.query.email}</span>에서 동의 후
        로그인 페이지로 이동해주세요 :)
      </h3>
    </p>
  );

  const onClickBtn = () => {
    router.push('/accounts/signin');
  };

  return (
    <div className={props.className}>
      <Result
        status='success'
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type='primary' key='console' onClick={onClickBtn}>
            로그인 페이지로 이동
          </Button>,
        ]}
      />
    </div>
  );
};

export default styled(SignUpSuccess)`
  & {
    * {
      margin-bottom: 20px;
    }
    .sub-title {
      margin: 45px 0;
    }
  }
`;
