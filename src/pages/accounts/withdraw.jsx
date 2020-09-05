import React from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { Card, Button, Modal, message } from 'antd';
import AuthAPI from '../../api/auth';

const WithDraw = () => {
  const router = useRouter();
  // id to userId
  const { id } = router.query;
  const [_, __, removeCookie] = useCookies(['token', 'id']);

  const withdraw = async () => {
    try {
      const resAuth = await AuthAPI.withdraw(id);
      if (resAuth.data.code == '200') {
        message.info('회원 탈퇴 처리되었습니다.');
        setTimeout(() => {
          removeCookie('token');
          removeCookie('id');
        }, 0);
        setTimeout(() => {
          router.reload();
        }, 100);
        router.push('/');
      }
    } catch (e) {
      return message.error(e.response.data.msg);
    }
  };

  const showWithdrawModal = (e) => {
    return Modal.confirm({
      title: '회원탈퇴',
      content: (
        <>
          <h3>탈퇴시 회원정보는 사라집니다.</h3>
          <h3>
            '정말 <span style={{ color: 'crimson' }}>탈퇴</span>하시겠습니까?'
          </h3>
        </>
      ),
      onOk() {
        withdraw();
      },
      onCancel() {},
    });
  };

  return (
    <Card style={{ margin: '50px 30px' }}>
      <h1 style={{ marginBottom: 20 }}>
        회원 탈퇴시 아래의 조취가 취해 집니다.
      </h1>
      <nav style={{ marginBottom: 20 }}>
        <li>
          회원 탈퇴 일로부터 계정과 닉네임을 포함한 계정
          정보(아이디/이메일/닉네임)는 '개인 정보 보호 정책'에 따라 60일간
          보관(잠김) 되며, 60일이 경과된 후에는 모든 개인 정보는 완전히 삭제되며
          더 이상 복구할 수 없게 됩니다.
        </li>
        <li>
          작성된 게시물은 삭제되지 않으며, 익명처리 후 OKKY로 소유권이
          귀속됩니다.
        </li>
        <li>
          게시물 삭제가 필요한 경우에는 관리자(admin@okky.kr)로 문의해 주시기
          바랍니다.
        </li>
      </nav>
      <div>
        <Button onClick={() => router.push('/profile/edit')}>아니오</Button>
        <Button type='danger' onClick={showWithdrawModal}>
          예, 탈퇴하겠습니다
        </Button>
      </div>
    </Card>
  );
};

export default WithDraw;
