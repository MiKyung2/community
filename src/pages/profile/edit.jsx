import React from "react";
import { Form, Button, Upload, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { useRouter } from "next/router";
import UserAPI from "../../api/user";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const EditProfile = ({ profile }) => {
  return useObserver(() => {
    const router = useRouter();

    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };

    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          nickname: profile.nickname,
          gitAddr: profile.gitAddr,
          profileImg: profile.profileImg,
          userId: profile.userId,
        }}
        onFieldsChange={(changedFields, allFields) => {
          console.log(
            "changedFields : ",
            JSON.stringify(changedFields, null, 3)
          );
          console.log("allFields : ", JSON.stringify(allFields, null, 3));
        }}
      >
        <Form.Item label="아이디">
          <span className="ant-form-text">{profile.userId}</span>
        </Form.Item>
        <Form.Item name="nickname" label="활동명">
          <Input />
        </Form.Item>

        <Form.Item name="gitAddr" label="개인 URL">
          <Input />
        </Form.Item>

        <Form.Item name="profileImg" label="프로필 사진">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
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
          <Button style={{ marginRight: "8px" }}>취소</Button>
          <Button
            style={{ marginRight: "8px" }}
            onClick={() => {
              router.push("/profile/password/edit");
            }}
          >
            비밀번호 수정
          </Button>
          <Button type="primary" htmlType="submit">
            프로필 수정
          </Button>
        </Form.Item>
      </Form>
    );
  });
};

EditProfile.getInitialProps = async () => {
  const profileRes = await UserAPI.get({ id: 1 });

  return {
    profile: profileRes.body,
  };
};

export default EditProfile;
