import styled from 'styled-components';
import { GetStaticPaths } from 'next';
import { Pagination, Table } from 'antd';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';

const Board = (props) => {
  return useObserver(() => {
    

    return (
      <div className="">
        <h2>제목: 게시판 예시1</h2>
        
        {/* 검색바 */}
        {/* 리스트 */}
        {/* <Table columns={state.columns} dataSource={state.dataSource} /> */}
        {/* 페이지네이션 */}
        {/* <Pagination defaultCurrent={state.page.current} total={state.page.total} /> */}
      </div>
    );
  });
};

export default styled(Board)`
`;
