import React, { useState, useEffect } from 'react';
import { Form, Button, Upload, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useObserver } from 'mobx-react';
import { useRouter } from 'next/router';
import UserAPI from '../../api/user';
import AuthAPI from '../../api/auth';
import { Cookies } from 'react-cookie';
import ChangePassModal from '../../components/profile/edit/ChanagePassModal';
const cookies = new Cookies();

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const EditProfile = ({ props }) => {
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      if (!profile) {
        const response = await UserAPI.get({ id: cookies.get('id') });
        setProfile(response.body);
      }
    };

    fetchData();
    form.setFieldsValue({
      nickname: profile?.nickname,
      gitAddr: profile?.gitAddr,
      profileImg: profile?.profileImg,
      userId: profile?.userId,
    });
  }, [profile]);

  return useObserver(() => {
    const router = useRouter();

    const onFinish = async (values) => {
      console.log('온 피니시');
      const resAuth = await AuthAPI.edit_user_info(values);
      console.log('api 호출 결과', resAuth);
    };

    return (
      <Form
        form={form}
        name='validate_other'
        {...formItemLayout}
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
        <Form.Item label='아이디'>
          <span className='ant-form-text'>{profile?.userId}</span>
        </Form.Item>
        <Form.Item name='nickname' label='닉네임'>
          <Input />
        </Form.Item>
        <Form.Item name='gitAddr' label='Git ID'>
          <Input />
        </Form.Item>
        <Form.Item name='profileImg' label='프로필 사진'>
          <Form.Item
            name='dragger'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name='files' action='/upload.do' disabled>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>변경예정</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button style={{ marginRight: '8px' }}>취소</Button>
          <Button
            style={{ marginRight: '8px' }}
            onClick={() => setVisible(true)}
          >
            비밀번호 수정
          </Button>

          <Button type='primary' htmlType='submit'>
            프로필 수정
          </Button>
          <ChangePassModal
            id={cookies.get('id')}
            visible={visible}
            setVisible={setVisible}
          />
        </Form.Item>
      </Form>
    );
  });
};

// EditProfile.getInitialProps = async (ctx) => {
//   const ck = cookie.parse(
//     (ctx.req ? ctx.req.headers.cookie : document.cookie) ?? '',
//   );
//   // Authorization
//   const token = ck.token ?? '';
//   const id = ck.id ?? '';
//   const decodedToken = jwt.decode(token.replace('Bearer ', ''));
//   const userId = decodedToken?.userId ?? '';
//   console.log(decodedToken);

//   const profileRes = await UserAPI.get({ id });

//   return {
//     profile: profileRes.body,
//   };
// };

export default EditProfile;
