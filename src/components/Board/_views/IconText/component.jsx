import * as React from "react";
import { Space } from "antd";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;