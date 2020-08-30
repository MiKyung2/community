export const regExp = {
  checkNum: /[0-9]/,
  checkEngA: /[A-Z]/,
  checkEnga: /[a-z]/,
  checkEngAll: /[a-zA-Z]/,
  checkSpc: /[~!@#$%^&*()_+|<>?:{}]/,
  checkKor: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  checkEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  checkPass: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,10}$/,
  checkUserId: /^[가-힣|a-z|A-Z|0-9|$@$!%*#?&|]{1,10}$/,
};

export const inputRules = {
  userId: [
    () => ({
      validator(rule, value) {
        if (
          value.match(/^[가-힣|a-z|A-Z|0-9|$@$!%*#?&|]{1,10}$/) ||
          value.length === 0
        ) {
          return Promise.resolve();
        }
        return Promise.reject('1글자 이상, 10글자 미만');
      },
    }),
  ],
  email: [
    () => ({
      validator(rule, value) {
        if (value.match(regExp.checkEmail) || value.length === 0) {
          return Promise.resolve();
        }
        return Promise.reject('이메일을 정확히 입렵해주세요');
      },
    }),
  ],
  password: [
    {
      required: true,
      message: '비밀번호를 입력해주세요',
    },
    () => ({
      validator(rule, value) {
        if (
          value.match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
          ) ||
          value.length === 0
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
