import { EditOutlined } from '@ant-design/icons';
import { Button, Row, Table, Tabs } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import { toJS } from 'mobx';
import { useRouter } from "next/router";
import cookie from 'cookie';
import jwt from "jsonwebtoken";

import React, { useEffect } from "react";
import styled from "styled-components";
import BoardAPI from "../../../api/board";
import SearchInput from "../../../components/SearchInput";
import Modal_login from '../../../components/Board/Modals/Modal_login';
import { sortLists } from '../../../components/Board/SortLists';
import { boardColumns } from '../../../components/Board/BoardColumns';
import { AppContext } from '../../../components/App/context';
import { BOARD } from '../../../utils/enum';


const { TabPane } = Tabs;

const BoardPage = (props) => {
    
  return useObserver(() => {
    const router = useRouter();
    const global = React.useContext(AppContext);

    console.log("cate global:", toJS(global.state.user))

    const boardListProps = props.props;
    const boardCate = props.props.cate;

    const state = useLocalStore(() => {
      return {
        dataSource: boardListProps?.listByDate?.content,
        page: {
          currentPage: 1,
          gb: 'title',
          keyword: '',
          size: 20,
          sort: "date",
          tablePage: 1,
          total: boardListProps?.listByDate?.totalElements
        },
        modal: {
          login: false
        },
      };
    });

    useEffect(() => {
      const updateList = async () => {
        try {
          const newList = await BoardAPI.list({
          boardType: BOARD[router.query.cate].board_type,
          currentPage: 1,
          gb: "title",
          keyword: '',
          size: 20,
          sort: "date"
          });
        state.dataSource = newList?.body.content;
        state.page.sort = "date";
        } catch(err) {
          console.error(err);
        }
      };
      updateList();

    }, [router.query.cate]);


    const fetchListData = async () => {
      const { currentPage, keyword, gb, size, sort } = state.page;
      const nextData = await BoardAPI.list({
        boardType: BOARD[router.query.cate].board_type,
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
          // if(!global.state.user.token) {
          if(!global.state.user.userId) {
            state.modal.login = true;
          } else {
            moveToWriterProfile(e);
          }
          } else {
            return;
          }
        }
      }
    }

    // 각가 포스트로 이동
    const moveToBoardPost = (boardId) => {
      router.push(`/board/[cate]/[id]`, `/board/${boardCate}/${boardId}`);
    }

    // 작성자 프로필로 이동
    const moveToWriterProfile = (e) => {
      const writer = e.target.dataset.name;
      router.push("/profile/[userId]", `/profile/${writer}`); 
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
      saveToLocal(keyword);

    }


    // 검색어 local storage에 저장
    const saveToLocal = (keyword) => {
      if(typeof window === 'undefined') return;
      // if(!global.state.user.token) return;
      if(!global.state.user.userId) return;
      const getHistory = localStorage.getItem("history") === null ? [] : JSON.parse(localStorage.getItem("history")); 
      const addHistory = [keyword, ...getHistory];
      const removeOverlap = Array.from(new Set(addHistory));
      const newHistory = removeOverlap.slice(0, 3);
      localStorage.setItem("history", JSON.stringify(newHistory));
    }

    // 유저 확인 & 새글쓰기로 이동
    const onClickNewPostBtn = () => {
      if(!global.state.user.userId) {
        state.modal.login = true;
      } else {
        router.push("/board/[cate]/articles/create", `/board/${boardCate}/articles/create`);
      }
    };

    // Hadle Modal - 로그인 메세지
    const handleCancel_LoginModal = (e) => {
      state.modal.login = false;
    }

    const handleOk_LoginModal = () => {
      router.push('/accounts/signin');
    }

    const checkAdmin = () => {
      const btn = <Button className="new_post_btn" type="primary" onClick={onClickNewPostBtn}>
                      <EditOutlined />
                      새글쓰기
                  </Button>;

      if(boardCate === 'recruit' || boardCate === 'noti') {
        if(global.state.user.role === 'A') {
          return btn;
        } else {
          return <div className="blank_post_btn"></div>;
        }
      } else {
        return btn;
      }
    }

    return (
      <div className={props.className}>

        <Row justify="space-between">
          <h1>{BOARD[router.query.cate].board_title}</h1>

          {/* "새글쓰기" 버튼 */}
          {checkAdmin()}
        </Row>

        {/* 로그인 메세지 */}
        <Modal_login 
            isLogin={state.modal.login} 
            handleOk={handleOk_LoginModal} 
            handleCancel={handleCancel_LoginModal} 
        />

        <Row align="top" justify="space-between" className="filter_container">
          {/* 최신순 | 좋아요순 | 댓글순 | 조회수순 */}
          <Tabs defaultActiveKey="date" activeKey={state.page.sort} onChange={onChangeSort}>
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

  const ck = cookie.parse(
    (ctx.req ? ctx.req.headers.cookie : document.cookie) ?? '',
  );
  const token = ck.token ?? "";
  const decodedToken = jwt.decode(token.replace("Bearer ", ""));
  const user = decodedToken?.userId ?? "";
  
  console.log("user:", user)
  
  if (user === "" && ctx.res && ctx.query.cate !== "free") {
    ctx.res.writeHead(302, { Location: "/accounts/signin" });
    ctx.res.end();
    return;
  }

  const cate = ctx.query.cate;
  let board_type;

  switch(cate) {
    case "free":
      board_type = "FREE"
      break;
    case "noti":
      board_type = "NOTICE"
      break;
    case "qna":
      board_type = "QNA"
      break;
    case "recruit":
      board_type = "JOB_OFFER"
    break;
    case "resumes":
      board_type = "JOB_SEARCH"
    break;
    case "secret":
      board_type = "SECRET"
      break;
  }
  
  // 최신순
  const boardListByDate = await BoardAPI.list({
    boardType: board_type,
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

export default styled(BoardPage)`
  & {
    .new_post_btn {
      margin-bottom: 40px;
    }
    .blank_post_btn {
      margin-bottom: 60px;
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
    .list_title {
      /* border: 1px solid red; */
      max-width: 300px;
      max-height: 20px;
      overflow: hidden;
    }
  }
`;
