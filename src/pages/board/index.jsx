import React from "react";
import styled from "styled-components";
import { useObserver, useLocalStore } from "mobx-react";
import broker from "../../api";
import { Row, Table } from "antd";
import BoardList from "../../components/Board/List";
import SearchInput from "../../components/SearchInput";
import Router from "next/router";

const BoardPage = (props) => {
  console.log("board props", props);

  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        columns: [
          {
            title: "번호",
            dataIndex: "number",
            key: "number",
          },
          {
            title: "제목",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "작성자",
            dataIndex: "writer",
            key: "writer",
          },
          {
            title: "좋아요",
            dataIndex: "likeCnt",
            key: "likeCnt",
          },
          {
            title: "조회수",
            dataIndex: "viewCnt",
            key: "viewCnt",
          },
          {
            title: "댓글수",
            dataIndex: "commentCnt",
            key: "commentCnt",
          },
        ],
        dataSource: [
          {
            key: "0",
            number: "1",
            title: "제목1",
            writer: "작성자1",
            likeCnt: 123,
            viewCnt: 123,
            commentCnt: 123,
          },
          {
            key: "1",
            number: "2",
            title: "제목2",
            writer: "작성자2",
            likeCnt: 123,
            viewCnt: 123,
            commentCnt: 123,
          },
        ],
        page: {
          total: 11,
          current: 1,
        },
      };
    });

    const filterLists = ["좋아요순", "댓글순", "조회수순"];

    const onClickFilter = (index) => {
      // index에 따라 다른 방법으로 정렬
      if (index === 0) {
        console.log("좋아요순 clicked!", index);
      } else if (index === 1) {
        console.log("댓글순 clicked!", index);
      } else {
        console.log("조회수순 clicked!", index);
      }
    };

    const onClickTableRow = (record, rowIndex) => {
      return {
        onClick: () => {
          // 해당 Row의 게시판 요청 api
          console.log("Table Row Clicked!-record", record);
          console.log("Table Row Clicked!-index", parseInt(rowIndex));

          Router.push("/board/[id]", `/board/${rowIndex}`);

          // state.dataSource.map(item => {
          //   // Router.push(`/board/[id]', '/board/${item.key}`)
          //   if(parseInt(rowIndex) === item.key) {

          //     console.log("item.key",item.key)
          //   }
          //   })
        },
      };
    };

    const state = useLocalStore(() => {
      return {
        columns: [
          {
            title: "번호",
            dataIndex: "number",
            key: "number",
          },
          {
            title: "제목",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "작성자",
            dataIndex: "writer",
            key: "writer",
          },
          {
            title: "좋아요",
            dataIndex: "likeCnt",
            key: "likeCnt",
          },
          {
            title: "조회수",
            dataIndex: "viewCnt",
            key: "viewCnt",
          },
          {
            title: "댓글수",
            dataIndex: "commentCnt",
            key: "commentCnt",
          },
        ],
        dataSource: [
          {
            key: "0",
            number: "1",
            title: "제목1",
            writer: "작성자1",
            likeCnt: 123,
            viewCnt: 123,
            commentCnt: 123,
          },
          {
            key: "1",
            number: "2",
            title: "제목2",
            writer: "작성자2",
            likeCnt: 123,
            viewCnt: 123,
            commentCnt: 123,
          },
        ],
        page: {
          total: 11,
          current: 1,
        },
      };
    });

    const filterLists = ["좋아요순", "댓글순", "조회수순"];

    const onClickFilter = (index) => {
      // index에 따라 다른 방법으로 정렬
      if (index === 0) {
        console.log("좋아요순 clicked!", index);
      } else if (index === 1) {
        console.log("댓글순 clicked!", index);
      } else {
        console.log("조회수순 clicked!", index);
      }
    };

    const onClickTableRow = (record, rowIndex) => {
      return {
        onClick: () => {
          // 해당 Row의 게시판 요청 api
          console.log("Table Row Clicked!-record", record);
          console.log("Table Row Clicked!-index", parseInt(rowIndex));

          Router.push("/board/[id]", `/board/${rowIndex}`);

          // state.dataSource.map(item => {
          //   // Router.push(`/board/[id]', '/board/${item.key}`)
          //   if(parseInt(rowIndex) === item.key) {

          //     console.log("item.key",item.key)
          //   }
          //   })
        },
      };
    };

    return (
      <div className={props.className}>
        {/* 검색바 */}
        <Row justify="end">
          <SearchInput />
        </Row>

        <Row justify="start">
          <ul className="filter">
            {filterLists &&
              filterLists.map((list, index) => (
                <li onClick={() => onClickFilter(index)}>{list}</li>
              ))}
          </ul>
        </Row>

        {/* 리스트 */}
        {/* <BoardList loading={false} dataSource={props} /> */}

        <Table
          columns={state.columns}
          dataSource={state.dataSource}
          onRow={onClickTableRow}
        />
      </div>
    );
  });
};

export const getStaticProps = async () => {
  const boardListRes = await BoardAPI.list({ title: "" });
  return {
    props: {
      board: boardListRes.body,
    },
  };
};

export default styled(BoardPage)`
  & {
    .filter {
      display: flex;
      margin-bottom: 20px;
      > li {
        margin-right: 10px;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;
