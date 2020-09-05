import React from 'react';
import { Title, StyledListFirstRow } from './home.styles';
import { NotificationOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import { data } from './dummy';

const NoticeBoard = () => {
  const maxData5 = data.slice(0, 5);
  return (
    <>
      <Title>
        <NotificationOutlined />
        <span>공지사항</span>
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

export default NoticeBoard;
