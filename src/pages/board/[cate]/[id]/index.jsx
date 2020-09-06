import { DislikeFilled, DislikeOutlined, EyeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Button, Modal, Row, Tooltip } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import {toJS} from 'mobx';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../../../components/App/context';
import React, {useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';

import BoardAPI from "../../../../api/board";
import UserAPI from "../../../../api/user";
import CommentAPI from "../../../../api/comment";
import Comments from "../../../../components/Board/Comment/Comments";
import { formatDate } from '../../../../utils/dateFormatter';
import { numFormatter } from '../../../../utils/numFormatter';
import Modal_delete from '../../../../components/Board/Modals/Modal_delete';

const Board = (props) => {
  
  return useObserver(() => {
    const router = useRouter();

    const global = React.useContext(AppContext);
    // const test_level = 'A';
    const test_level = 'Y';

    const boardData = props.board.body;
    const boardCate = props.boardCate
    const boardId = props.boardId;
    
    const state = useLocalStore(() => {
      return {
        data: boardData,
        events: {
          like: boardData.rowLike,
          dislike: boardData.rowDisLike,
          action: '',
        },
        comments: props.comments.body,
        modal: {
          delete: false,
          login: false
        },
        writer: boardData.writer,
        user: '',
        isWriter: false,
        login: false
      };
    });


    useEffect(() => {
      // 유저 정보
      const getUserInfo = async() => {
        if(!global.state.user.token) return;
          const userInfo = await UserAPI.get({userId: global.state.user.userId}); 
          state.user = userInfo?.body.userId ? userInfo.body.userId : '';
          state.login = true;
      };
      getUserInfo();

    }, []);

    
    const setIsWriter = () => {
      if(state.writer === state.user) {
        state.isWriter = true
      } else {
        state.isWriter = false
      }
    }
    setIsWriter();

    const onClickBackToList = () => {
      router.push(`/board/${boardCate}`);
    }

    const onClickLike = async () => {
      if (state.login) {
        await BoardAPI.event({ id: queryId, itemGb: "L" });
        state.events.action = "liked";
        state.events.like = state.events.like + 1;
      } else {
        return;
      }
    };

    const onClickDislike = async () => {
      if (state.login) {
        await BoardAPI.event({ id: queryId, itemGb: "D" });
        state.events.action = "disliked";
        state.events.dislike = state.events.dislike + 1;
      } else {
        return;
      }
    };

    const onClickEdit = () => {
      router.push(`/board/${boardCate}/${boardId}/modify`);
    }

    const onClickDelete = () => {
      state.modal.delete = true;
    }

    const handleCancel_DeleteModal = (e) => {
      state.modal.delete = false;
    }

    const handleOk_DeleteModal = () => {
      const boardDeleteRes = async () => await BoardAPI.delete({
        id: boardId
      });
      boardDeleteRes();
      router.push(`/board/${boardCate}`);
      state.modal.delete = false;
    }

    // 작성자 프로필로 이동
    const moveToWriterProfile = () => {
      router.push(`/profile/${state.data.writer}`);
    }

    // 어드민 확인
    const checkAdmin = () => {
      const btn = <Row>
      <Button type="text" onClick={onClickEdit}>수정</Button>
      <Button type="text" onClick={onClickDelete}>삭제</Button>
      </Row>;

      if (test_level === 'A') {
        return btn;
      } else {
        if(state.isWriter) {
          return btn;
        } else {
          return null;
        }
      }
    } 
    
    return (
      <div className={props.className}>
        <Row justify="space-between" className="header_top">
          <h2>{state.data.title}</h2>
          <Button type="default" onClick={onClickBackToList}>글 목록</Button>
        </Row>

        <div className="header_bottom">
          <span><strong>작성일:</strong> {formatDate(state.data.createdDate)}</span>
            <p>
              <strong>작성자: </strong> 
              <Tooltip title="프로필 이동">
                <span className="hover" onClick={moveToWriterProfile}>{state.data.writer}</span>
              </Tooltip>
            </p>
        </div>


        <div className="main_container">

          <Row justify="space-between" className="main_container_top" style={state.isWriter ? {paddingBottom: 0} : {paddingBottom: '10px'}}>
            {/* 해당 게시글 조회수 & 댓글수 & 좋아요수 */}
            <Row>
              <span className="main_container_top_left "><EyeOutlined /> {numFormatter(state.data.viewCount)}</span>
              <Tooltip title={state.login ? "좋아요" : "로그인 해주세요"}>
                <span className="main_container_top_left event" onClick={onClickLike}>{state.events.action === 'liked' ? <LikeFilled /> : <LikeOutlined />} {numFormatter(state.events.like)}</span>
              </Tooltip>
              <Tooltip title={state.login ? "싫어요" : "로그인 해주세요"}>
                <span className="main_container_top_left event" onClick={onClickDislike}>{state.events.action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />} {numFormatter(state.events.dislike)}</span>
              </Tooltip>
              {/* <span className="main_container_top_left "><CommentOutlined /> {state.data.commentCnt}</span> */}
            </Row>

            {/* 수정 & 삭제 */}
            {checkAdmin()}
          </Row>

          {/* 게시글 내용 */}
          <div className="main_content">{ReactHtmlParser(`${state.data.contents}`)}</div>
        </div>


        {/* 댓글 */}
        <div className="comment-section">
          <h3>댓글</h3>
          <Comments queryId={boardId} data={props.comments.body} isAdmin={test_level} />
        </div>

        {/* 삭제 확인 메세지 */}
        <Modal_delete 
          isDelete={state.modal.delete} 
          handleOk={handleOk_DeleteModal} 
          handleCancel={handleCancel_DeleteModal} 
        />
      </div>
    );
  });
};



Board.getInitialProps = async (ctx) => {

  const query = ctx.query;

  const boardDetailRes = await BoardAPI.detail({
    id: query.id
  });
  const comments = await CommentAPI.get({
    id: query.id
  });

  return {
    board: boardDetailRes,
    comments,
    boardCate: query.cate,
    boardId: query.id
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
    .hover {
      &:hover {
        cursor: pointer;
        color: #1980ff;
        font-weight: bold;
      }
    }
  }
`;
