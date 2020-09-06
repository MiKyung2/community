import React from 'react';
import { StyledListBottomRow, StyledCard, StyledTable } from './home.styles';
import { List, Typography } from 'antd';
import { data } from './dummy';
import { useRouter } from "next/router";

const JobBoard = ({ list }) => {
  const router = useRouter();
  const maxData5 = list.map(b => b.id + "=" + b.title);
  return (
    <StyledListBottomRow
      header={<div className='board-title'>구인/구직</div>}
      bordered
      dataSource={maxData5}
      renderItem={(item) => {
        const onClick = (board) => {
          const boardId = board.split("=")[0];
          router.push(`/board/JOB_OFFER/[id]`, `/board/JOB_OFFER/${boardId}`);
        }
        return (
          <List.Item className='list-item' onClick={e => onClick(item)} >
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )
      }}
    />
  );
};

export default JobBoard;
