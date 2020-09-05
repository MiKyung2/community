import { EditOutlined } from '@ant-design/icons';
import { Button, Row, Table, Modal, Tabs, Tooltip } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import { toJS } from 'mobx';
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

import React, { useEffect } from "react";
import styled from "styled-components";
import BoardAPI from "../../api/board";
import SearchInput from "../../components/SearchInput";
import { formatDateWithTooltip } from '../../utils/dateFormatter';
import { numFormatter } from '../../utils/numFormatter';

const { TabPane } = Tabs;

// 최신순 | 좋아요순 | 댓글순 | 조회수순
const sortLists = [
  {
    id: 'newest',
    name: '최신순',
  },
  {
    id: 'like',
    name: '좋아요순'
  },
  {
    id: 'commentCnt',
    name: '댓글순'
  },
  {
    id: 'viewCount',
    name: '조회수순'
  },
];

const BoardPage = (props) => {
  // console.log("boardpage props", props);

  return useObserver(() => {
    const router = useRouter();
    const state = useLocalStore(() => {
      return {
        dataSource: props.listByDate.content,
        page: {
          currentPage: 1,
          gb: 'title',
          keyword: '',
          size: 20,
          sort: "date",
          tablePage: 1,
          total: props.listByDate.totalElements
        },
        modal: {
          login: false
        },
        boardTitle: '자유게시판'
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
      router.push('/board/[id]', `/board/${boardId}`);
    }

    const moveToWriterProfile = () => {
      // 작성자 아이디로 변수처리 필요!!
      router.push(`/profile/20`);
    }

    const boardColumns = [
      {
        title: "제목",
        dataIndex: "title",
        key: "title",
        render: title => <span id="title" className="hover">{title}</span>
      }, {
        title: "작성자",
        dataIndex: "writer",
        key: "writer",
        render: writer => (
          <Tooltip title="프로필 이동">
            <span id="writer" className="hover">{writer}</span>
          </Tooltip>)
      }, {
        title: "좋아요",
        dataIndex: "rowLike",
        key: "rowLike",
        render: like => <span>{numFormatter(like)}</span>
      }, {
        title: "조회수",
        dataIndex: "viewCount",
        key: "viewCount",
        render: view => <span>{numFormatter(view)}</span>
      }, {
        title: "댓글수",
        dataIndex: "commentCnt",
        key: "commentCnt",
        render: comment => <span>{numFormatter(comment)}</span>
      },
      {
        title: "날짜",
        dataIndex: "createdDate",
        key: "createdDate",
        render: date => (
          <span>
            {formatDateWithTooltip(date)}
          </span>
        )
      },
    ];

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
    const [cookies, _, removeCookie] = useCookies(['token', 'id']);
    
    const onClickNewPostBtn = () => {
      if(!cookies.token) {
        state.modal.login = true;
      } else {
        router.push("/board/articles/create");
      }
    };

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
        <Modal
        visible={state.modal.login}
        onOk={handleOk_LoginModal}
        onCancel={handleCancel_LoginModal}
        >
          <p>
            새글을 등록하려면 로그인 해주세요.<br/>
            로그인 페이지로 이동하시겠습니까?
          </p>
        </Modal>

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
export const getStaticProps = async () => {

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
    .hover {
      &:hover {
        cursor: pointer;
        color: #1890ff;
      }
    }
  }
`;
