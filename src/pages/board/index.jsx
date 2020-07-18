import React from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import broker from '../../api';
import { Row, Divider } from 'antd';
import BoardList from '../../components/Board/List';
import SearchInput from '../../components/SearchInput';

const BoardPage = (props) => {
  return useObserver(() => {
    return (
      <div className={props.className}>
        {/* 검색바 */}
        <Row justify="end">
          <SearchInput />
        </Row>
        <Row justify="start">
          <div onClick={() => { }}>좋아요순</div>
          <Divider type="vertical" style={{ borderLeft: "1px solid #000" }} />
          <a href="#">댓글순</a>
          <Divider type="vertical" style={{ borderLeft: "1px solid #000" }} />
          <a href="#">조회수순</a>
        </Row>
        {/* 리스트 */}
        <BoardList loading={false} dataSource={props.board.content} />
      </div>
    );
  });
};

export const getStaticProps = async () => {
  const boardListRes = await broker.boardList.read({ title: "" });
  return {
    props: {
      board: boardListRes.body,
    }
  };
}

export default styled(BoardPage)`
  & {
    .filter {
      display: flex;
      > li {
        margin-right: 10px;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
