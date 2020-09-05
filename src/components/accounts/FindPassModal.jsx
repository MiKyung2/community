import React from 'react';
import { Modal, Form, Input, message, Button } from 'antd';

import AuthAPI from '../../api/auth';

import { regExp, inputRules } from './validator';

const FindPassModal = ({ visible, setVisible }) => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onFindPassword = async () => {
    setLoading(true);
    const resAuth = (await AuthAPI.find_pass(email)) || 'aa';
    if (resAuth.status === 200) {
      setLoading(false);
      message.success(`이메일로 새 비밀번호를 발송했습니다.`);
      setVisible(false);
    }
    if (resAuth === '500') {
      setTimeout(() => {
        setLoading(false);
        message.error('회원정보를 다시 한 번 확인해 주세요');
        return;
      }, 1500);
    }
  };

  const showConfirmModal = (e) => {
    e.preventDefault();
    if (email.match(regExp.checkEmail)) {
      return Modal.confirm({
        title: '입력하신 이메일로 새로운 비밀번호를 전송합니다',
        content: `${email} 로 전송하시길 원하십니까?`,
        onOk() {
          onFindPassword();
        },
        onCancel() {},
      });
    }
    return message.error('잘못된 이메일 양식입니다.');
  };

  if (loading) {
    message.info('이메일 인증 처리중입니다.');
  }

  return (
    <Modal
      title='새 비밀번호 생성'
      visible={visible}
      style={{ top: '100px' }}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key='back'
          onClick={handleCancel}
          disabled={loading ? true : false}
        >
          취소
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={showConfirmModal}
          disabled={loading ? true : false}
        >
          새 비밀번호 생성
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          style={{
            margin: 0,
            textAlign: 'center',
          }}
          name='email'
          initialValues={email}
          rules={inputRules.email}
        >
          <Input
            style={{ width: '280px' }}
            name='email'
            placeholder='이메일을 입력해주세요'
            size='large'
            disabled={loading ? true : false}
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FindPassModal;
