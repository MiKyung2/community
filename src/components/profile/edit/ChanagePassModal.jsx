import React, { useState } from 'react';
import { Modal, Form, Input, message, Button } from 'antd';

import AuthAPI from '../../../api/auth';

import { regExp, inputRules } from './validator';

const FindPassModal = ({ id, visible, setVisible }) => {
  const [pass, setPass] = useState({
    password1: '',
    password2: '',
  });
  const { password1, password2 } = pass;

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  //   변경후 깔끔하게 사라지지 않음 예전 코드 참고
  const onClear = () => {
    setPass({
      password1: '',
      password2: '',
    });
  };

  const onChangePassword = async () => {
    const resAuth = (await AuthAPI.change_pass(id, password1)) || 'aa';
    if (resAuth.status === 200) {
      message.success(`비밀번호가 성공적으로 변경되었습니다.`);
      handleOk();
      onClear();
    }
    if (resAuth === '500') {
      setLoading(false);
      message.error('변경되지 않았습니다.');
      onClear();
      return;
    }
  };

  const showConfirmModal = (e) => {
    e.preventDefault();
    if (password1.match(regExp.checkPass) && password1 === password2) {
      return Modal.confirm({
        title: '비밀번호 변경 안내',
        content: '비밀번호를 변경하시겠습니까?',
        onOk() {
          onChangePassword();
        },
        onCancel() {},
      });
    }
    return message.error('비밀번호를 확인 해주세요.');
  };

  return (
    <Modal
      title='비밀번호 변경'
      visible={visible}
      style={{ top: '100px' }}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          취소
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={showConfirmModal}
          disabled={password1 === password2 ? false : true}
        >
          비밀번호 변경
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          style={{
            margin: 0,
            textAlign: 'center',
          }}
          className='center form-item'
          name={['password']}
          rules={inputRules.password}
          hasFeedback
        >
          <Input
            style={{ width: '280px', marginBottom: 10 }}
            className='input'
            type='password'
            placeholder='영문 + 숫자 조합 8자리 이상'
            value={password1}
            onChange={(e) => {
              setPass((state) => ({ ...state, password1: e.target.value }));
            }}
            autoComplete='off'
            size='large'
          />
        </Form.Item>
        <Form.Item
          style={{
            margin: 0,
            textAlign: 'center',
          }}
          className='center form-item'
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={inputRules.passwordCheck}
        >
          <Input
            style={{ width: '280px' }}
            className='input'
            type='password'
            placeholder='비밀번호 확인'
            value={password2}
            onChange={(e) => {
              setPass((state) => ({ ...state, password2: e.target.value }));
            }}
            autoComplete='off'
            size='large'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FindPassModal;
