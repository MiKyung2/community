import React from 'react';
import { Modal } from 'antd';
import { PropTypes } from 'mobx-react';

function ModalDelete({ isDelete, handleOk, handleCancel }) {
  return (
    <Modal
      visible={isDelete}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>정말 삭제하시겠습니까?</p>
    </Modal>
  );
}

ModalDelete.propTypes = {
  isDelete: PropTypes.func,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

ModalDelete.defaultProps = {
  isDelete: () => {},
  handleOk: () => {},
  handleCancel: () => {},
};

export default ModalDelete;
