import { DislikeFilled, DislikeOutlined, EyeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Button, Modal, Row } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import React, {useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';

import BoardAPI from "../../../api/board";
import UserAPI from "../../../api/user";
import CommentAPI from "../../../api/comment";
import Comments from "../../../components/Board/Comment/Comments";
import { formatDate } from '../../../utils/dateFormatter';
import { numFormatter } from '../../../utils/numFormatter';



const Board = (props) => {

  const router = useRouter();
  const queryId = router.query.id;
  const boardProps = props.props;

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        data: boardProps.board.body,
        events: {
          like: boardProps.board.body.rowLike,
          dislike: boardProps.board.body.rowDisLike,
          action: '',
        },
        comments: boardProps.comments.body,
        visible: false,
        writer: boardProps.board.body.writer,
        user: '',
        login: false
      };
    });

    // 유저 정보
    const [cookies, _, removeCookie] = useCookies(['token', 'id']);

    useEffect(() => {
      const getUserInfo = async() => {
        if(!cookies.token) return;
          const userInfo = await UserAPI.get({id: cookies.id});            
          state.user = userInfo?.body.nickname ? userInfo.body.nickname : '';
      };
      getUserInfo();

    }, []);

    
    const setLogin = () => {
      if(state.writer === state.user) {
        state.login = true
      } else {
        state.login = false
      }
    }
    setLogin();

    const onClickBackToList = () => {
      router.push('/board');
    }

    const onClickLike = async () => {
      await BoardAPI.event({ id: queryId, itemGb: "L" });
      state.events.action = "liked";
      state.events.like = state.events.like + 1;
    };

    const onClickDislike = async () => {
      await BoardAPI.event({ id: queryId, itemGb: "D" });
      state.events.action = "disliked";
      state.events.dislike = state.events.dislike + 1;
    };

    const onClickEdit = () => {
      router.push(`/board/${queryId}/modify`);
    }

    const onClickDelete = () => {
      state.visible = true;
    }

    const handleCancelDelete = (e) => {
      state.visible = false;
    }

    const handleOkDelete = () => {
      const boardDeleteRes = async () => await BoardAPI.delete({
        id: queryId
      });
      boardDeleteRes();
      router.push('/board');
      state.visible = false;
    }

    return (
      <div className={props.className}>
        <Row justify="space-between" className="header_top">
          <h2>{state.data.title}</h2>
          <Button type="default" onClick={onClickBackToList}>글 목록</Button>
        </Row>

        <div className="header_bottom">
          <span><strong>작성일:</strong> {formatDate(state.data.createdDate)}</span>
          <span><strong>작성자:</strong> {state.data.writer}</span>
        </div>


        <div className="main_container">

          <Row justify="space-between" className="main_container_top" style={state.login ? {paddingBottom: 0} : {paddingBottom: '10px'}}>
            {/* 해당 게시글 조회수 & 댓글수 & 좋아요수 */}
            <Row>
              <span className="main_container_top_left "><EyeOutlined /> {numFormatter(state.data.viewCount)}</span>
              <span className="main_container_top_left event" onClick={onClickLike}>{state.events.action === 'liked' ? <LikeFilled /> : <LikeOutlined />} {numFormatter(state.events.like)}</span>
              <span className="main_container_top_left event" onClick={onClickDislike}>{state.events.action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />} {numFormatter(state.events.dislike)}</span>
              {/* <span className="main_container_top_left "><CommentOutlined /> {state.data.commentCnt}</span> */}
            </Row>

            {/* 수정 & 삭제 */}
            {state.login && 
              <Row>
                <Button type="text" onClick={onClickEdit}>수정</Button>
                <Button type="text" onClick={onClickDelete}>삭제</Button>
              </Row>
            }
          </Row>

          {/* 삭제 확인 메세지 */}
          <Modal
            visible={state.visible}
            onOk={handleOkDelete}
            onCancel={handleCancelDelete}
          >
            <p>정말 삭제하시겠습니까?</p>
          </Modal>


          {/* 게시글 내용 */}
          <div className="main_content">{ReactHtmlParser(`${state.data.contents}`)}</div>
        </div>


        {/* 댓글 */}
        <div className="comment-section">
          <h3>댓글</h3>
          {/* <Comments queryId={queryId} data={state.comments} /> */}
          <Comments queryId={queryId} data={boardProps.comments.body} />
        </div>
      </div>
    );
  });
};



Board.getInitialProps = async ({ query }) => {

  const boardDetailRes = await BoardAPI.detail({
    id: query.id
  });

  const comments = await CommentAPI.get({
    id: query.id
  });

  return {
    props: {
      board: boardDetailRes,
      comments
    }
  };

}

export default styled(Board)`
  & {
    .header_top {
      margin-bottom: 60px;
      > h2 {
        margin-bottom: 40px;
      }
    }
    .header_bottom {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 20px;
      padding: 0 6px;
    }
    .main_container {
      /* border: 1px solid green; */
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px 10px;
      margin-bottom: 100px;
    }
    .main_container_top {
      /* border: 1px solid red; */
      border-bottom: 1px solid lightgray;
      align-items: center;
      padding-left: 15px;
    }
    .main_container_top_left {
      margin-right: 10px;
      color: gray;
      &.event {
        cursor: pointer;
      }
    }
    .main_content {
      /* border: 1px solid red; */
      display: block;
      width: 100%;
      max-height: 1000px;
      margin-top: 50px;
      padding: 0 30px 30px 30px;
      overflow: auto;
    }
    .comment-section {
      > h3 {
        margin-bottom: 15px;
      }
    }
  }
`;
