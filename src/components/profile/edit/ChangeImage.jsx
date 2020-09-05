import React, { useState, useEffect } from 'react';
import { Modal, Upload, Button, message } from 'antd';
import AuthAPI from '../../../api/auth';

const ChangeImage = ({ visible, setVisible, userId }) => {
  const [image, setImage] = useState(null);
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setImage(null);
    setVisible(false);
  };

  const uploadImage = async () => {
    const res = await AuthAPI.edit_user_image(image, userId);
    if (res.status === 200) {
      message.success('프로필 이미지가 수정 되었습니다.');
      handleOk();
      window.location.reload();
    } else {
      message.error('잘못된 정보입니다.');
    }
  };

  const handleChange = ({ fileList }) => {
    setImage(fileList);
  };

  useEffect(() => {
    console.log(image);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      footer={image ? <Button onClick={uploadImage}>이미지 변경</Button> : null}
      closable={false}
      style={{ marginTop: 150, maxWidth: 420 }}
      onCancel={handleCancel}
    >
      <div>
        <div
          style={{
            borderBottom: '1px solid black',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <Upload name='files' onChange={handleChange}>
            <p
              style={{
                fontSize: '34px',
              }}
            >
              사진 업로드
            </p>
          </Upload>
        </div>
        <div
          style={{
            borderBottom: '1px solid black',
            fontSize: '34px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={handleCancel}
        >
          현재 사진 삭제
        </div>
        <div
          style={{
            borderBottom: '1px solid black',
            fontSize: '34px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={handleCancel}
        >
          취소
        </div>
      </div>
    </Modal>
  );
};

export default ChangeImage;
