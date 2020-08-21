import React, {useEffect} from 'react';
import styled, {ServerStyleSheet, injectGlobal} from 'styled-components';
import { Button, Row, Modal } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CONFIG from '../../../utils/CONFIG';
import { numFormatter } from '../../../utils/numFormatter';
import { formatDate } from '../../../utils/dateFormatter';
import ReactHtmlParser from 'react-html-parser';

import BoardAPI from "../../../api/board";
import CommentList from '../../../components/Board/Comment/CommentList';
import AddComment from '../../../components/Board/Comment/AddComment';


const Board = (props) => {
  // CONFIG.LOG("Board props", props)
  
  const router = useRouter();
  const queryId = router.query.id;

  const boardProps = props.props;

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        data: boardProps.board.body,
        visible: false
      };
    });

    
    const onClickBackToList = () => {
      router.push('/board');
    }

    const onClickLikeDislike = () => {
      // CONFIG.LOG("clicked like or dislike!")
    }

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
      const boardDeleteRes = async() => await BoardAPI.delete({ 
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

            <Row justify="space-between" className="main_container_top">
              {/* 해당 게시글 조회수 & 댓글수 & 좋아요수 */}
              <Row>
                <span className="main_container_top_left "><EyeOutlined /> {numFormatter(state.data.viewCount)}</span>
                <span className="main_container_top_left "><LikeOutlined onClick={onClickLikeDislike} /> {numFormatter(state.data.rowLike)}</span>
                <span className="main_container_top_left "><DislikeOutlined onClick={onClickLikeDislike} /> {numFormatter(state.data.rowDisLike)}</span>
                {/* <span className="main_container_top_left "><CommentOutlined /> {state.data.commentCnt}</span> */}
              </Row>

              {/* 수정 & 삭제 */}
              <Row>
                <Button type="text" onClick={onClickEdit}>수정</Button>
                <Button type="text" onClick={onClickDelete}>삭제</Button>
              </Row>
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

            {/* 댓글 - 리스트 */}
            <CommentList queryId={queryId} />

            {/* 댓글 - 새댓글 등록 */}
            <AddComment queryId={queryId} />
          </div>
      </div>
    );
  });
};



Board.getInitialProps = async({ query }) => {

  const boardDetailRes = await BoardAPI.detail({ 
    id: query.id
   });
  //  CONFIG.LOG("boardDetailRes", boardDetailRes)
  return {
    props: {
      board: boardDetailRes,
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
    }
    .main_content {
      /* border: 1px solid red; */
      width: 100%;
      flex: 9;
      margin-top: 50px;
      padding: 0 30px 30px 30px;
    }
    .comment-section {
      > h3 {
        margin-bottom: 15px;
      }
    }
  }
`;
