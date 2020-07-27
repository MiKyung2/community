import { useObserver } from "mobx-react";
import { Form, Button, Upload, Input } from "antd";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ProfilePasswordEdit = () => {
  return useObserver(() => {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };

    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="확인 비밀번호"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button style={{ marginRight: "8px" }}>취소</Button>
          <Button
            type="primary"
            onClick={() => {
              router.push("/profile/password/edit");
            }}
          >
            비밀번호 수정
          </Button>
        </Form.Item>
      </Form>
    );
  });
};

export default ProfilePasswordEdit;
