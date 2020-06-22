import styled from 'styled-components';
import { GetStaticPaths } from 'next';
import { Pagination, Table } from 'antd';
import { useObserver, useLocalStore } from 'mobx-react';

const Board = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        columns: [{
          title: "제목",
          dateIndex: "title",
          key: "title",
        }, {
          title: "작성자",
          dateIndex: "writer",
          key: "writer",
        }, {
          title: "좋아요",
          dateIndex: "likeCnt",
          key: "likeCnt",
        }, {
          title: "조회수",
          dateIndex: "viewCnt",
          key: "viewCnt",
        }, {
          title: "댓글수",
          dateIndex: "commentCnt",
          key: "commentCnt",
        }],
        dataSource: [{
          key: "1",
          title: "제목",
          writer: "작성자",
          likeCnt: 1,
          viewCnt: 1,
          commentCnt: 1,
        }],
        page: {
          total: 11,
          current: 1,
        }
      };
    });

    return (
      <div className="">
        게시판
        {/* 검색바 */}
        {/* 리스트 */}
        {/* <Table dataSource={state.dataSource} columns={state.columns} /> */}
        {/* 페이지네이션 */}
        {/* <Pagination defaultCurrent={state.page.current} total={state.page.total} /> */}
      </div>
    );
  });
};

export default styled(Board)`
`;
