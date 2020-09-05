import React from 'react';
import { Title, StyledListFirstRow } from './home.styles';
import { FlagOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import { data } from './dummy';

const Freeboard = () => {
  const maxData5 = data.slice(0, 5);
  return (
    <>
      <Title>
        <FlagOutlined />
        <span>자유게시판</span>
      </Title>
      <StyledListFirstRow
        bordered
        dataSource={maxData5}
        renderItem={(item) => (
          <List.Item className='list-item'>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </>
  );
};

export default Freeboard;
