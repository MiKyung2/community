import React from 'react';
import { Modal } from "antd";

function Modal_login({isLogin, handleOk, handleCancel}) {
    return (
        <Modal
        visible={isLogin}
        onOk={handleOk}
        onCancel={handleCancel}
        >
          <p>
            이 기능을 이용하려면 로그인 해주세요.<br/>
            로그인 페이지로 이동하시겠습니까?
          </p>
        </Modal>
    )
}

export default Modal_login
