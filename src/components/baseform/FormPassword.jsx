import { Form, Input } from 'antd';

const FormPassword = (props) => {
  return (
    <Form.Item
      label="비밀번호"
      name="password"
      rules={[
        {
          required: true,
          message: '비밀번호를 입력해주세요.',
        },
      ]}
    >
      <Input.Password
        id="password"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Form.Item>
  );
}

export default FormPassword;