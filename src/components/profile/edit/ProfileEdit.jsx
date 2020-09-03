import React, { useState, useEffect } from 'react';
import {
  Card,
  Avatar,
  Form,
  Button,
  Upload,
  Input,
  message,
  Badge,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useObserver } from 'mobx-react';
import AuthAPI from '../../../api/auth';
import ChangeImage from './ChangeImage';
import { StyledCard } from './styles/EditProfile.styles';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditProfile = ({ profile, id }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nickname: profile?.nickname,
      gitAddr: profile?.gitAddr,
      profileImg: profile?.profileImg,
      userId: profile?.userId,
    });
  }, [profile]);

  return useObserver(() => {
    const onFinish = async (values) => {
      const res = await AuthAPI.edit_user_info(values, id);
      console.log(res);
      if (res.status === 200) {
        message.success('프로필 정보가 수정 되었습니다.');
      } else {
        message.error('잘못된 정보입니다.');
      }
    };
    return (
      <Card>
        <Form
          form={form}
          name='validate_other'
          style={{ marginTop: 20 }}
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            nickname: profile?.nickname,
            gitAddr: profile?.gitAddr,
            profileImg: profile?.profileImg,
            userId: profile?.userId,
          }}
          onFieldsChange={(changedFields, allFields) => {
            // console.log(
            //   'changedFields : ',
            //   JSON.stringify(changedFields, null, 3),
            // );
            // console.log('allFields : ', JSON.stringify(allFields, null, 3));
            // const json = JSON.stringify(allFields, null, 3);
          }}
        >
          <Form.Item>
            <div style={{ display: 'flex' }}>
              <div>
                <Avatar
                  src={
                    profile.profileImg ||
                    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  }
                  style={{ height: 120, width: 120 }}
                />
              </div>
              <div style={{ margin: 'auto 40px' }}>
                <h2>{profile.nickname}</h2>
                <h3 style={{ margin: 0, border: 0, padding: 0 }}>
                  안녕하세요 :)
                </h3>
                <p
                  style={{
                    marginTop: 10,
                    border: 0,
                    padding: 0,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => setVisible(true)}
                >
                  이미지 변경
                </p>
                <ChangeImage
                  userId={profile?.userId}
                  visible={visible}
                  setVisible={setVisible}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item name='userId' label='아이디'>
            <Input />
          </Form.Item>
          <Form.Item name='nickname' label='닉네임'>
            <Input />
          </Form.Item>
          <Form.Item name='gitAddr' label='Git ID'>
            <Input />
          </Form.Item>
          {/* <Form.Item name='profileImg' label='프로필 사진'>
            <Form.Item
              name='dragger'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name='files' action='/upload.do'>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>
                  Click or drag file to this area to upload
                </p>
                <p className='ant-upload-hint'>변경예정</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item> */}
          <Form.Item>
            <Button style={{ marginRight: '8px' }}>취소</Button>
            <Button type='primary' htmlType='submit'>
              프로필 수정
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  });
};

export default EditProfile;
