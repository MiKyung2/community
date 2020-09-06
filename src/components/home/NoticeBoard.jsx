import React from 'react';
import { Title, StyledListFirstRow } from './home.styles';
import { NotificationOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import { data } from './dummy';
import { useRouter } from "next/router";

const NoticeBoard = ({ list }) => {
  const router = useRouter();
  const maxData5 = list.map(b => b.id + "=" + b.title);
  return (
    <>
      <Title>
        <NotificationOutlined />
        <span>공지사항</span>
      </Title>
      <StyledListFirstRow
        bordered
        dataSource={maxData5}
        renderItem={(item) => {
          const onClick = (board) => {
            const boardId = board.split("=")[0];
            router.push(`/board/NOTICE/[id]`, `/board/NOTICE/${boardId}`);
          }
          return (
            <List.Item className='list-item' onClick={e => onClick(item)} >
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )
        }}
      />
    </>
  );
};
export default NoticeBoard;
