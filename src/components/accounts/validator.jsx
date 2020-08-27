export const regExp = {
  checkNum: /[0-9]/,
  checkEngA: /[A-Z]/,
  checkEnga: /[a-z]/,
  checkEngAll: /[a-zA-Z]/,
  checkSpc: /[~!@#$%^&*()_+|<>?:{}]/,
  checkKor: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  checkEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  checkPass: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,10}$/,
};

export const inputRules = {
  nickname: [
    () => ({
      validator(rule, value) {
        if (value.match(/^[가-힣|a-z|A-Z|0-9|$@$!%*#?&|]{1,10}$/)) {
          return Promise.resolve();
        }
        return Promise.reject('1글자 이상, 10글자 미만');
      },
    }),
  ],
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
  password: [
    {
      required: true,
      message: '비밀번호를 입력해주세요',
    },
    () => ({
      validator(rule, value) {
        if (
          value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/)
        ) {
          return Promise.resolve();
        }
        return Promise.reject('영어, 숫자, 특수문자 포함 8자 이상 20자 미만');
      },
    }),
  ],
  passwordCheck: [
    {
      required: true,
      message: '비밀번호를 확인해 주세요.',
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject('비밀번호가 일치하지 않습니다.');
      },
    }),
  ],
};
