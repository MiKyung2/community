import { Form, Input } from 'antd';

const FormEmail = (props) => {
  return (
    <Form.Item
      label="아이디"
      name="email"
      rules={[
        {
          required: true,
          message: '이메일을 입력해주세요.',
        },
      ]}
    >
      <Input
        id="email"
        value={props.emil}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Form.Item>
  );
}

export default FormEmail;