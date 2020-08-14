import React from "react";
import styled from "styled-components";
import { useObserver, useLocalStore } from "mobx-react";
import BoardAPI from "../../api/board";
import { Row, Table, Button } from "antd";
import { EditOutlined } from '@ant-design/icons';
import SearchInput from "../../components/SearchInput";
import { useRouter } from "next/router";
import CONFIG from '../../utils/CONFIG';
import { numFormatter } from '../../utils/numFormatter';

const useNumberFormatter = (num) => {
  return num > 0 ? numFormatter(num) : 0
}

const columns = [
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
    render: like => <span>{useNumberFormatter(like)}</span>
  }, {
    title: "조회수",
    dataIndex: "viewCount",
    key: "viewCount",
    render: view => <span>{useNumberFormatter(view)}</span>
  }, {
    title: "댓글수",
    dataIndex: "commentCnt",
    key: "commentCnt",
  },
  {
    title: "날짜",
    dataIndex: "createdDate",
    key: "createdDate",
  },
];

 // 최신순 | 좋아요순 | 댓글순 | 조회수순
 const filterLists = [
  {
    id: 'filter_newest',
    name: '최신순'
  },
  {
    id: 'filter_like',
    name: '좋아요순'
  },
  {
    id: 'filter_comment',
    name: '댓글순'
  },
  {
    id: 'filter_view',
    name: '조회수순'
  },
];


const BoardPage = (props) => {
  // CONFIG.LOG("boardpage props", props);

  return useObserver(() => {
    const router = useRouter();

    const state = useLocalStore(() => {
      return {
        dataSource: props.listByLike,
        page: {
          pageSize: 10,
          currentPage: 1,
        },
      };
    });

    // CONFIG.LOG("index-props:", props.listByLike)

    const onClickFilter = (selectedFilter) => {
      // CONFIG.LOG("onclickFIlter", e.target.id);
      const target = selectedFilter.target.id;

      switch (target) {
        case 'filter_newest' :
          // CONFIG.LOG("최신순!!");
          break;
        case 'filter_like' :
          // CONFIG.LOG("좋아요순!!");
          state.dataSource = props.listByLike;
          break;
        case 'filter_comment' :
          // CONFIG.LOG("댓글순!!");
          state.dataSource = props.listByComment;
          break;
        case 'filter_view' :
          // CONFIG.LOG("조회수순!!");
          state.dataSource = props.listByViewCnt;
          break;
        default :
          // CONFIG.LOG("default-최신순?");
          // console.error("filter error");
      }
    }

    // 해당 게시물 이동
    const onClickTableRow = (record, rowIndex) => {
      return {
        onClick: () => {       
          router.push('/board/[id]', `/board/${record.id}`);
        }
      }
    }

    const onChangePage = (page, pageSize) => {
      // CONFIG.LOG("page:", page, "pageSize", pageSize);
      state.page.currentPage = page;
    }

    // 필터&검색
    const onSubmitSearchInput = (searchResult) => {
      state.dataSource = searchResult;
    }

    // 새글쓰기로 이동
    const onClickNewPostBtn = () => {
      router.push("/board/articles/create");
    };

    
    // CONFIG.LOG("hi", state.dataSource);


    return (
      <div className={props.className}>
        
        <Row justify="space-between">
          <h1>게시판 이름</h1>

          {/* "새글쓰기" 버튼 */}
          <Button className="new_post_btn" type="primary" onClick={onClickNewPostBtn}>
            <EditOutlined />
            새글쓰기
          </Button>
        </Row>

        <Row align="bottom" justify="space-between" className="filter_container">
          {/* 좋아요순 | 댓글순 | 조회수순 */}
          <ul className="filter">
            {filterLists && filterLists.map(list => (
              <li id={list.id} onClick={onClickFilter}>{list.name}</li>
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
          pagination={{ 
            pageSize: state.page.pageSize, 
            onChange: onChangePage, 
            // total: 500
          }}
          scroll={true}
        />        
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
    .new_post_btn {
      margin-bottom: 40px;
    }
    .filter_container {
      margin-bottom: 20px;
    }
    .filter {
      display: flex;
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
