import React, { useState, useEffect } from 'react';
import { Card, Avatar, Form, Button, Input, message } from 'antd';

import AuthAPI from '../../../api/auth';
import ChangeImage from './ChangeImage';
import { inputRules, regExp } from './validator';

const EditProfile = ({ profile, id }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  console.log(profile);

  useEffect(() => {
    form.setFieldsValue({
      nickname: profile?.nickname,
      gitAddr: profile?.gitAddr,
      profileImg: profile?.profileImg,
      userId: profile?.userId,
    });
  }, [profile]);

  // const checkInputs = () => {};

  const onFinish = async (values) => {
    const res = await AuthAPI.edit_user_info(values, id);
    if (res.status === 200) {
      message.success('프로필 정보가 수정 되었습니다.');
      window.location.reload();
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
        <Form.Item name='userId' label='아이디' rules={inputRules.userId}>
          <Input disabled />
        </Form.Item>
        <Form.Item name='nickname' label='닉네임' rules={inputRules.nickname}>
          <Input />
          {/* <Input
            value={profile?.nickname}
            onChange={(e) => console.log(e.target.value)}
          /> */}
        </Form.Item>
        <Form.Item
          name='gitAddr'
          label='Git ID'
          rules={[
            {
              required: false,
              whitespace: false,
              message: '아이디를 넣어주세요',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button style={{ marginRight: '8px' }}>취소</Button>
          <Button type='primary' htmlType='submit'>
            프로필 수정
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditProfile;
