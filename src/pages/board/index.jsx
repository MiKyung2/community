import React from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import broker from '../../api';

const BoardPage = (props) => {
  return useObserver(() => {
    return (
      <div className={props.className}>
        {/* 검색바 */}
        {/* 리스트 */}
      </div>
    );
  });
};

export const getStaticProps = async () => {
  const columns = [];
  const dataSource = [];

  const boardListRes = await broker.boardList.read({ title: "" });
  console.log("board : ", boardListRes);
  return {
    props: {
      data: { dataSource, columns }
    }
  };
}

export default styled(BoardPage)`
`;
