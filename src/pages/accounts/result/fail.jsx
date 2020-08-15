import styled from 'styled-components';
import {useRouter} from 'next/router';
import { Result, Button } from 'antd';


const SignUpFail = (props) => {

    const router = useRouter();

    const title = `회원가입 실패`;
    const subTitle = <p className="sub-title">
        회원가입에 실패하였습니다. 다시 시도해 주세요.<br/><br/>
        회원가입 후 홈페이지 내의 서비스를 자유롭게 이용하실 수 있습니다.
    </p>;
 

    const onClickToSignUp = () => {
        console.log("회원가입 페이지로 이동!");
        router.push('/accounts/signup');
    }

    const onClickToHome = () => {
        console.log("홈으로 이동!");
        router.push('/');
    }

  return (
    <div className={props.className}>
      <Result
        status="error"
        title={title}
        subTitle={subTitle}
        extra={[
            <Button type="primary" key="signup" onClick={onClickToSignUp}>
                회원가입 페이지로
            </Button>,
            <Button key="home" onClick={onClickToHome}>홈으로</Button>
        ]}
    />
    </div>
  )
}

export default styled(SignUpFail)`
    &{
        * {
            margin-bottom: 20px;
        }
        .sub-title {
            margin: 45px 0;
        }
       
    }
`;