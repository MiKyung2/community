import React from 'react';
import { Modal } from "antd";

function Modal_delete({isDelete, handleOk, handleCancel}) {
    return (
        <Modal
        visible={isDelete}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    )
}

export default Modal_delete
