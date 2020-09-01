import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Button } from 'antd';
import ChangePassModal from './ChanagePassModal';

const PassAndDeleteUser = ({ id }) => {
  const router = useRouter();
  const [showPassModal, setShowPassModal] = useState(false);
  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
        <Button
          type='primary'
          style={{ marginBottom: 15 }}
          size='large'
          onClick={() => setShowPassModal(true)}
        >
          비밀번호 수정
        </Button>
        <ChangePassModal
          id={id}
          visible={showPassModal}
          setVisible={setShowPassModal}
        />
        <Button
          type='danger'
          size='large'
          onClick={() =>
            router.push({
              pathname: '/accounts/withdraw',
              query: { id: id },
            })
          }
        >
          회원 탈퇴
        </Button>
      </div>
    </Card>
  );
};

export default PassAndDeleteUser;
