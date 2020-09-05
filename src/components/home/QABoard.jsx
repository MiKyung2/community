import React from 'react';
import { StyledListBottomRow, StyledCard, StyledTable } from './home.styles';
import { List, Typography } from 'antd';
import { data } from './dummy';

const QABoard = () => {
  return (
    <StyledListBottomRow
      header={<div className='board-title'>Q&A</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item className='list-item'>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export default QABoard;
