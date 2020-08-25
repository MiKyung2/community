import React from 'react';
import { Modal, Card, Input, message, Button } from 'antd';

const PolicyModal = ({ visible, setVisible }) => {
  const handleOk = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      style={{ top: '100px' }}
      onOk={handleOk}
      closable={false}
      footer={[
        <Button key='submit' type='primary' onClick={handleOk}>
          확인
        </Button>,
      ]}
    >
      <Card>정책입니다.</Card>
    </Modal>
  );
};

export default PolicyModal;
