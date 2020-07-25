import React from "react";
import styled from "styled-components";
import { useObserver, useLocalStore } from "mobx-react";
import BoardAPI from "../../api/board";
import { Row, Table, Column, Button } from "antd";
import { EditOutlined } from '@ant-design/icons';
import SearchInput from "../../components/SearchInput";
import {useRouter} from "next/router";


const BoardPage = (props) => {

  // console.log(props);
  // console.log("content", props.board.content)

  return useObserver(() => {

    const router = useRouter();


    const state = useLocalStore(() => {
      return {
        columns: [{
          title: "번호",
          dataIndex: "id",
          key: "id",
        },
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
        }],
        // 게시판의 initial data 가져오기
        dataSource: props.board.content,
        page: {
          total: 11,
          current: 1,
        }
      };
    });

    const initialData = props.board.content;

    console.log("initialData", initialData);

    const filterLists = ['좋아요순', '댓글순', '조회수순'];


    // 검색 필터 변경
    const onClickFilter = (index) => {

      // index에 따라 다른 방법으로 정렬
      // datasource에 가져온 데이터 넣기?
      if (index === 0) {
        //  "좋아요순"으로 해당 게시판 게시물 불러오는 api
        console.log("좋아요순 clicked!", index);

      } else if(index === 1) {
        //  "댓글순"으로 해당 게시판 게시물 불러오는 api
        console.log("댓글순 clicked!", index);
        
      } else {
        // "조회수순"으로 해당 게시판 게시물 불러오는 api
        console.log("조회수순 clicked!", index);
      }

    }

    // 새글쓰기 버튼 클릭
    const onClickNewPostBtn = () => {
      console.log("새글쓰기");
      router.push('/board/articles/create');
    }

    // 해당 게시물 이동
    const onClickTableRow = (record, rowIndex) => {
      return {
        onClick: () => {
          // console.log("Table Row Clicked!-record", record);
          // console.log("Table Row Clicked!-index", parseInt(rowIndex));

          // 해당 게시물로 이동
          router.push('/board/[id]', `/board/${rowIndex}`);
          
        }
      }
    }

    return (
      <div className={props.className}>

        

        <Row justify="space-between">

          <h1>게시판 이름</h1>

          {/* "새글쓰기" 버튼 */}
          <Button style={{marginBottom: '40px'}} type="primary" onClick={onClickNewPostBtn}><EditOutlined />새글쓰기</Button>
        
        </Row>

      
        <Row align="bottom" justify="space-between" style={{marginBottom: '20px'}}>

          {/* 좋아요순 | 댓글순 | 조회수순 */}
          <ul className="filter">

            {filterLists && filterLists.map((list, index) => (
              <li onClick={() => onClickFilter(index)}>{list}</li>
            ))}

          </ul>

          {/* 검색바 */}
          <SearchInput />

        </Row>

        {/* 테이블 & 리스트 */}
        <Table 
          columns={state.columns} 
          dataSource={state.dataSource} 
          onRow={onClickTableRow} 
          pagination={{ pageSize: 10 }}
          scroll={true}
        />
          {/* {state.dataSource && state.dataSource.map(data => {
            <Column />

          })}
        </Table> */}

        
      </div>
    );
  });
};

export const getStaticProps = async () => {
  const boardListRes = await BoardAPI.list({ 
    gb: "title",
    keyword: "title",
    // offset: 10,
    // pageNumber: 1,
    // pageSize: 10,
    sort: "title"
   });
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
