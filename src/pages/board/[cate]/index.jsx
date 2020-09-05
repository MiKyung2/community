import { EditOutlined } from '@ant-design/icons';
import { Button, Row, Table, Modal, Tabs, Tooltip } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import { toJS } from 'mobx';
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

import React, { useEffect } from "react";
import styled from "styled-components";
import BoardAPI from "../../../api/board";
import SearchInput from "../../../components/SearchInput";
import Modal_login from '../../../components/Board/Modals/Modal_login';
import { sortLists } from '../../../components/Board/SortLists';
import { boardColumns } from '../../../components/Board/BoardColumns';
import { AppContext } from '../../../components/App/context';

const { TabPane } = Tabs;

const BoardPage = (props) => {
    const global = React.useContext(AppContext);
    const userToken = global.state.user.token;
    console.log("boardPage global-props:", toJS(global.props))
    console.log("boardPage global-state:", toJS(global.state))
    const boardListProps = props.props;
    console.log("boardpage data:", boardListProps)
    const boardCate = props.props.cate;
    let board_title;

  switch(boardCate) {
    case "free":
      board_title = "자유게시판"
      break;
    case "noti":
      board_title = "공지사항"
      break;
    case "qna":
      board_title = "Q&A"
      break;
    case "recruit":
      board_title = "구인게시판"
    break;
    case "resumes":
      board_title = "구직게시판"
    break;
    case "secret":
      board_title = "비밀게시판"
      break;
    default:
      console.log("board name error")
  }

  return useObserver(() => {
    const router = useRouter();
    const state = useLocalStore(() => {
      return {
        dataSource: boardListProps.listByDate.content,
        page: {
          currentPage: 1,
          gb: 'title',
          keyword: '',
          size: 20,
          sort: "date",
          tablePage: 1,
          total: boardListProps.listByDate.totalElements
        },
        modal: {
          login: false
        },
        boardTitle: board_title,
        auth: {
          member: false,
          admin: false
        }
      };
    });

    useEffect(() => {
      const updateList = async () => await BoardAPI.list({
        currentPage: 1,
        gb: "title",
        keyword: '',
        size: 20,
        sort: "date"
      });
      updateList();

    }, []);


    const fetchListData = async () => {
      const { currentPage, keyword, gb, size, sort } = state.page;
      const nextData = await BoardAPI.list({
        currentPage,
        keyword,
        gb,
        size,
        sort
      });

      state.dataSource = nextData.body.content;
      state.page.total = nextData.body.totalElements ? nextData.body.totalElements : state.page.total;
    }

    const moveToFirstPage = () => {
      state.page.tablePage = 1;
      state.page.currentPage = 1;
    }

    const onChangeSort = (selectedFilter) => {
      console.log("change sort:", selectedFilter);
      // if (selectedFilter !== "newest" || selectedFilter !== "like" || selectedFilter !== "commentCnt" || selectedFilter !== "viewCount") return;

      // 정미경의 코멘트 : sortLists id를 서버에 주는 값과 똑같이 쓰면 코드가 간단해집니다.
      state.page.sort = selectedFilter;
      moveToFirstPage();
      fetchListData();
    }

    // 제목 클릭 - 게시글로 이동 || 작성자 클릭 - 작성자 프로필로 이동
    const onRowClick = (record, rowIndex) => {
      return {
        onClick: (e) => {
          const target = e.target.id;
          if(target === 'title') {
            moveToBoardPost(record.id);
          } else if (target === 'writer') {
            moveToWriterProfile();
          } else {
            return;
          }
        }
      }
    }

    const moveToBoardPost = (boardId) => {
      router.push(`/board/${boardCate}/[id]`, `/board/${boardCate}/${boardId}`);
    }

    const moveToWriterProfile = () => {
      // 작성자 아이디로 변수처리 필요!!
      router.push(`/profile/20`);
    }

    // 페이지 변경
    const onChangePage = (page, pageSize) => {
      state.page.tablePage = page;
      state.page.currentPage = page;
      fetchListData();
    }

    // 필터&검색
    const onSearch = (searchTerm) => {
      const {gb, keyword, sort} = searchTerm;

      state.page.currentPage = 1;
      state.page.tablePage = 1;
      state.page.gb = gb ? gb : state.page.gb;
      state.page.keyword = keyword ? keyword : state.page.keyword;
      state.page.sort = sort ? sort : state.page.sort;

      fetchListData();

    }

    // 유저 확인 & 새글쓰기로 이동
    // const [cookies, _, removeCookie] = useCookies(['token', 'id']);
    
    const onClickNewPostBtn = () => {
      if(!userToken) {
        state.modal.login = true;
      } else {
        router.push(`/board/${boardCate}/articles/create`);
      }
    };

    // Hadle Modal - 로그인 메세지
    const handleCancel_LoginModal = (e) => {
      state.modal.login = false;
    }

    const handleOk_LoginModal = () => {
      router.push('/accounts/signin');
    }

    return (
      <div className={props.className}>

        <Row justify="space-between">
          <h1>{state.boardTitle}</h1>

          {/* "새글쓰기" 버튼 */}
          <Button className="new_post_btn" type="primary" onClick={onClickNewPostBtn}>
            <EditOutlined />
            새글쓰기
          </Button>
        </Row>

        {/* 로그인 메세지 */}
        <Modal_login 
            isLogin={state.modal.login} 
            handleOk={handleOk_LoginModal} 
            handleCancel={handleCancel_LoginModal} 
        />

        <Row align="top" justify="space-between" className="filter_container">
          {/* 최신순 | 좋아요순 | 댓글순 | 조회수순 */}
          <Tabs onChange={onChangeSort}>
            {sortLists && sortLists.map(list => (
              <TabPane tab={list.name} key={list.id} />
            ))}
          </Tabs>

          {/* 검색바 */}
          <SearchInput onSearch={onSearch} />
        </Row>

        {/* 테이블 & 리스트 */}
        <Table
          columns={boardColumns}
          dataSource={state.dataSource}
          onRow={onRowClick}
          pagination={{
            pageSize: state.page.size,
            total: state.page.total,
            onChange: onChangePage,
            current: state.page.tablePage,
          }}
          scroll={true}
        />
      </div>
    );
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++
// 서버사이드 영역
// ++++++++++++++++++++++++++++++++++++++++++++

BoardPage.getInitialProps = async(ctx) => {
  
  // 최신순
  const boardListByDate = await BoardAPI.list({
    currentPage: 1,
    gb: "title",
    keyword: '',
    size: 20,
    sort: "date"
  });
  
  return {
    props: {
      listByDate: boardListByDate.body,
      cate: ctx.query.cate,
    },
  };

}

// export const getStaticProps = async (ctx) => {

//     console.log("board test-ctx:", ctx);

//   // 최신순
//   const boardListByDate = await BoardAPI.list({
//     currentPage: 1,
//     gb: "title",
//     keyword: '',
//     size: 20,
//     sort: "date"
//   });

//   return {
//     props: {
//       listByDate: boardListByDate.body,
//     },
//   };
// };

export default styled(BoardPage)`
  & {
    .new_post_btn {
      margin-bottom: 40px;
    }
    .filter_container {
      margin-bottom: 20px;
    }
    .hover {
      &:hover {
        cursor: pointer;
        color: #1890ff;
      }
    }
  }
`;
