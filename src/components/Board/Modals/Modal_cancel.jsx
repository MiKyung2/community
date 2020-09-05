import React from 'react';
import { Modal } from "antd";

function Modal_cancel({isCancel, handleOk, handleCancel}) {
    return (
      <Modal 
      visible={isCancel}
      onOk={handleOk}
      onCancel={handleCancel}
      >
          <p>정말 취소하시겠습니까?</p>
      </Modal>
    )
}

export default Modal_cancel
