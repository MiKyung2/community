import React from "react";
import styled from "styled-components";
import { useObserver, useLocalStore } from "mobx-react";
import BoardAPI from "../../api/board";
import { Row, Table, Button } from "antd";
import { EditOutlined } from '@ant-design/icons';
import SearchInput from "../../components/SearchInput";
import {useRouter} from "next/router";


const BoardPage = (props) => {

  return useObserver(() => {
    const router = useRouter();

    const state = useLocalStore(() => {
      return {
        // 게시판의 initial data 가져오기
        dataSource: props.listByLike,
        page: {
          total: 11,
          current: 1,
        },
      };
    });

    const columns = [
    // {
    //   title: "번호",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    }, {
      title: "작성자",
      dataIndex: "writer",
      key: "writer",
    }, {
      title: "좋아요",
      dataIndex: "rowLike",
      key: "rowLike",
    }, {
      title: "조회수",
      dataIndex: "viewCount",
      key: "viewCount",
    }, {
      title: "댓글수",
      dataIndex: "commentCnt",
      key: "commentCnt",
    }];

    console.log("dataSource length", state.dataSource.length)

    const filterLists = ['좋아요순', '댓글순', '조회수순'];

    // 검색 필터 변경
    const onClickFilter = (index) => {

      if (index === 0) {
        //  "좋아요순"
        state.dataSource = props.listByLike;
      } else if (index === 1) {
        //  "댓글순"
        state.dataSource = props.listByComment;
      } else {
        // "조회수순"
        state.dataSource = props.listByViewCnt;
      }
    };

    // 새글쓰기
    const onClickNewPostBtn = () => {
      router.push("/board/articles/create");
    };

    // 해당 게시물 이동
    const onClickTableRow = (record, rowIndex) => {
      return {
        onClick: () => {
          console.log("해당 게시물 id", state.dataSource[rowIndex].id)

          // 해당 게시물로 이동
          router.push('/board/[id]', `/board/${state.dataSource[rowIndex].id}`);

          
        }
      }
    }

    // 필터&검색
    const onSubmitSearchInput = (searchResult) => {
      console.log("submit search inputtt", searchResult);
      state.dataSource = searchResult;
    }


    return (
      <div className={props.className}>
        <Row justify="space-between">
          <h1>게시판 이름</h1>

          {/* "새글쓰기" 버튼 */}
          <Button
            style={{ marginBottom: "40px" }}
            type="primary"
            onClick={onClickNewPostBtn}
          >
            <EditOutlined />
            새글쓰기
          </Button>
        </Row>

        <Row
          align="bottom"
          justify="space-between"
          style={{ marginBottom: "20px" }}
        >
          {/* 좋아요순 | 댓글순 | 조회수순 */}
          <ul className="filter">
            {filterLists &&
              filterLists.map((list, index) => (
                <li onClick={() => onClickFilter(index)}>{list}</li>
              ))}
          </ul>

          {/* 검색바 */}
          <SearchInput onSubmitSearchInput={onSubmitSearchInput} />
        </Row>

        {/* 테이블 & 리스트 */}
        <Table
          columns={columns}
          dataSource={state.dataSource}
          onRow={onClickTableRow}
          pagination={{ pageSize: 10 }}
          scroll={true}
        />
          {/* {state.dataSource && state.dataSource.map(data => { */}
            {/* <Column key="00" dataIndex="dataindex" /> */}

          {/* })} */}
        {/* </Table> */}

        
      </div>
    );
  });
};

export const getStaticProps = async () => {
  // 좋아요순
  const boardListByLike = await BoardAPI.list({ 
    gb: "title",
    sort: "like"
   });

  // 댓글순
  const boardListByComment = await BoardAPI.list({ 
    gb: "title",
    sort: "commentCnt"
   });

  // 조회수순
  const boardListByViewCnt = await BoardAPI.list({ 
    gb: "title",
    sort: "viewCount"
   });


  return {
    props: {
      listByLike: boardListByLike.body.content,
      listByComment: boardListByComment.body.content,
      listByViewCnt: boardListByViewCnt.body.content
    },
  };
};

export default styled(BoardPage)`
  & {
    .filter {
      display: flex;
      /* margin-bottom: 20px; */
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
