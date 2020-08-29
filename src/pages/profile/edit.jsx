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

const EditProfile = ({ profile }) => {
  const [profileT, setProfileT] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      if (!profileT) {
        const response = await UserAPI.get({ id: cookies.get('id') });
        setProfileT(response.body);
      }
    };

    fetchData();
    form.setFieldsValue({
      nickname: profileT?.nickname,
      gitAddr: profileT?.gitAddr,
      profileImg: profileT?.profileImg,
      userId: profileT?.userId,
    });
  }, [profileT]);

  console.log('프로파일 이미지: ', profileT?.profileImg);

  return useObserver(() => {
    const router = useRouter();
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    const onEditInfo = async () => {
      const resAuth = await AuthAPI.edit_user_info();
      console.log('수정', resAuth);
    };

    return (
      <Form
        form={form}
        name='validate_other'
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          nickname: profileT?.nickname,
          gitAddr: profileT?.gitAddr,
          profileImg: profileT?.profileImg,
          userId: profileT?.userId,
        }}
        onFieldsChange={(changedFields, allFields) => {
          onEditInfo();
          // console.log(
          //   'changedFields : ',
          //   JSON.stringify(changedFields, null, 3),
          // );
          // console.log('allFields : ', JSON.stringify(allFields, null, 3));
        }}
      >
        <Form.Item label='아이디'>
          <span className='ant-form-text'>{profileT?.userId}</span>
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
            <Upload.Dragger name='files' action='/upload.do'>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload.
              </p>
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
<<<<<<< HEAD

//   // Authorization: Bearer <token>

//   let id = null;
//   if (!ctx.req) {
//     id = cookies.get('id');
//   }
//   console.log('cookies', id);

//   const profileRes = await UserAPI.get({ id: 19 });
=======
//   const ck = cookie.parse(
//     (ctx.req ? ctx.req.headers.cookie : document.cookie) ?? '',
//   );
//   //Authorization
//   const token = ck.token ?? '';
//   const id = ck.id ?? '';
//   const decodedToken = jwt.decode(token.replace('Bearer ', ''));
//   const userId = decodedToken?.userId ?? '';

//   const profileRes = await UserAPI.get({ id });
>>>>>>> b1b8f0f... edit profile edit, signup

//   return {
//     profile: profileRes.body,
//   };
// };

export default EditProfile;
