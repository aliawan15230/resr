import React from 'react';
import { Modal } from 'antd';

const DeleteModal = ({ visible, onConfirm, onCancel, title, message }) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
    >
      <p>{message}</p>
    </Modal>
  );
};

export default DeleteModal;