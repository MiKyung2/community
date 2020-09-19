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

    const boardData = props.board.body;
    const boardCate = props.boardCate
    const boardId = props.boardId;
    
    const state = useLocalStore(() => {
      return {
        data: boardData,
        events: {
          like: boardData.rowLike,
          dislike: boardData.rowDisLike,
          action: {
            liked: false,
            disliked: false
          }
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
        if(!global.state.user.userId) return;
          const userInfo = await UserAPI.get({ userId: encodeURI(global.state.user.userId) }); 
          state.user = userInfo?.body.userId ? userInfo.body.userId : '';
          state.login = true;
      };
      getUserInfo();

      // 게시글 업데이트
      const getBoardDetail = async() => {
        const boardDetailRes = await BoardAPI.detail({
          id: router.query.id
        });
        state.data = boardDetailRes.body
      };
      getBoardDetail();

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
      router.push("/board/[cate]", `/board/${boardCate}`);
    }

    const onClickLike = async () => {
      if (state.login) {
        const payload = {
          clickUserId: encodeURI(global.state.user.userId),
          id: router.query.id,
          itemGb: "L"
        }
        await BoardAPI.event(payload);
        state.events.action.liked = !state.events.action.liked;
        // state.events.like = !state.events.action.liked ? state.events.like + 1 : state.events.like - 1;
        // state.events.like = state.events.like + 1;
      } else {
        return;
      }
    };

    const onClickDislike = async () => {
      if (state.login) {
        const payload = {
          clickUserId: encodeURI(global.state.user.userId),
          id: router.query.id,
          itemGb: "D"
        }
        await BoardAPI.event(payload);
        state.events.action.disliked = !state.events.action.disliked;
        // state.events.dislike = state.events.dislike + 1;
      } else {
        return;
      }
    };

    const onClickEdit = () => {
      router.push("/board/[cate]/[id]/modify", `/board/${boardCate}/${boardId}/modify`);
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
      router.push("/board/[cate]", `/board/${boardCate}`);
      state.modal.delete = false;
    }

    // 작성자 프로필로 이동
    const moveToWriterProfile = () => {
      if (global.state.user.role === 'A' || state.login) {
        router.push("/profile/[userId]", `/profile/${state.data.writer}`);
      } else {
        return;
      }
    }

    // 어드민 확인
    const checkAdmin_btn = () => {
      const btn = <Row>
      <Button type="text" onClick={onClickEdit}>수정</Button>
      <Button type="text" onClick={onClickDelete}>삭제</Button>
      </Row>;

      if (global.state.user.role === 'A' || state.isWriter) {
        return btn;
      } else {
        return null;
      }
    } 

    const checkAdmin_writer = () => {
      let title;
      if(global.state.user.role === 'A' || state.login) {
        title = "프로필 이동"
      } else {
        title = "로그인 해 주세요";
      }
      return title;
    }
    
    return (
      <>
      <div className={props.className}>
        <Row justify="space-between" className="header_top">
          <h2>{state.data.title}</h2>
          <Button type="default" onClick={onClickBackToList}>글 목록</Button>
        </Row>

        <div className="header_bottom">
          <span><strong>작성일:</strong> {formatDate(state.data.createdDate)}</span>
            <p>
              <strong>작성자: </strong> 
              <Tooltip title={checkAdmin_writer()}>
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
                {/* <span className="main_container_top_left event" onClick={onClickLike}>{state.events.action === 'liked' ? <LikeFilled /> : <LikeOutlined />} {numFormatter(state.events.like)}</span> */}
                <span className="main_container_top_left event" onClick={onClickLike}>{state.events.action.liked ? <LikeFilled /> : <LikeOutlined />} {numFormatter(state.events.like)}</span>
              </Tooltip>
              <Tooltip title={state.login ? "싫어요" : "로그인 해주세요"}>
                {/* <span className="main_container_top_left event" onClick={onClickDislike}>{state.events.action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />} {numFormatter(state.events.dislike)}</span> */}
                <span className="main_container_top_left event" onClick={onClickDislike}>{state.events.action.disliked ? <DislikeFilled /> : <DislikeOutlined />} {numFormatter(state.events.dislike)}</span>
              </Tooltip>
              {/* <span className="main_container_top_left "><CommentOutlined /> {state.data.commentCnt}</span> */}
            </Row>

            {/* 수정 & 삭제 */}
            {checkAdmin_btn()}
          </Row>

          {/* 게시글 내용 */}
          <div className="main_content">
            {ReactHtmlParser(`${state.data.contents}`)}
          </div>
        </div>


        {/* 댓글 */}
        <div className="comment-section">
          <h3>댓글</h3>
          <Comments queryId={boardId} data={props.comments.body} isAdmin={global.state.user.role} />
        </div>

        {/* 삭제 확인 메세지 */}
        <Modal_delete 
          isDelete={state.modal.delete} 
          handleOk={handleOk_DeleteModal} 
          handleCancel={handleCancel_DeleteModal} 
        />
      </div>
      </>
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
        /* border: 1px solid red; */
        max-width: 700px;
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



        /*
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/

body
{
	/* Font */
	/* Emoji fonts are added to visualise them nicely in Internet Explorer. */
	font-family: sans-serif, Arial, Verdana, "Trebuchet MS", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: 12px;

	/* Text color */
	color: #333;

	/* Remove the background color to make it transparent. */
	background-color: #fff;

	margin: 20px;
}

.cke_editable
{
	font-size: 13px;
	line-height: 1.6;

	/* Fix for missing scrollbars with RTL texts. (#10488) */
	word-wrap: break-word;
}

blockquote
{
	font-style: italic;
	font-family: Georgia, Times, "Times New Roman", serif;
	padding: 2px 0;
	border-style: solid;
	border-color: #ccc;
  border-width: 0;
  margin: 13px 40px;
  padding: 2px 8px 2px 20px;
	border-left-width: 5px;
}

a
{
	color: #0782C1;
}

ol,dl
{

	/* IE7: reset rtl list margin. (#7334) */
	*margin-right: 0px;
	/* Preserved spaces for list items with text direction different than the list. (#6249,#8049)*/
  /* padding: 0 40px; */
  list-style: disc;
}

ul
{
  list-style: decimal;
}

h1,h2,h3,h4,h5,h6
{
	font-weight: normal;
	line-height: 1.2;
}

hr
{
	border: 0px;
	border-top: 1px solid #ccc;
}

img {
  /* border: 1px solid blue; */
}

p > a > img {
  /* border: 1px solid red; */
  width: 300px;
  height: 300px;
}

figure > img {
  /* border: 1px solid red; */
  display: block;
  height: auto;
  margin: 0 auto;
  max-width: 100%;
}

figure {
  &.easyimage-side {
    float: right;
    max-width: 50%;
    min-width: 10em;
    margin-left: 1.5em;
  }
}

/* img.right
{
	border: 1px solid #ccc;
	float: right;
	margin-left: 15px;
	padding: 5px;
}

img.left
{
	border: 1px solid #ccc;
	float: left;
	margin-right: 15px;
	padding: 5px;
} */

pre
{
	white-space: pre-wrap; /* CSS 2.1 */
	word-wrap: break-word; /* IE7 */
	-moz-tab-size: 4;
	tab-size: 4;
}

.marker
{
	background-color: Yellow;
}

span[lang]
{
	font-style: italic;
}

figure
{
	text-align: center;
	outline: solid 1px #ccc;
	background: rgba(0,0,0,0.05);
	padding: 10px;
	margin: 10px 20px;
	display: inline-block;
}

figure > figcaption
{
	text-align: center;
	display: block; /* For IE8 */
}

a > img {
	padding: 1px;
	margin: 1px;
	border: none;
	outline: 1px solid #0782C1;
}

/* Widget Styles */
.code-featured
{
	border: 5px solid red;
}

.math-featured
{
	padding: 20px;
	box-shadow: 0 0 2px rgba(200, 0, 0, 1);
	background-color: rgba(255, 0, 0, 0.05);
	margin: 10px;
}

.image-clean
{
	border: 0;
	background: none;
	padding: 0;
}

.image-clean > figcaption
{
	font-size: .9em;
	text-align: right;
}

.image-grayscale
{
	background-color: white;
	color: #666;
}

.image-grayscale img, img.image-grayscale
{
	filter: grayscale(100%);
}

.embed-240p
{
	max-width: 426px;
	max-height: 240px;
	margin:0 auto;
}

.embed-360p
{
	max-width: 640px;
	max-height: 360px;
	margin:0 auto;
}

.embed-480p
{
	max-width: 854px;
	max-height: 480px;
	margin:0 auto;
}

.embed-720p
{
	max-width: 1280px;
	max-height: 720px;
	margin:0 auto;
}

.embed-1080p
{
	max-width: 1920px;
	max-height: 1080px;
	margin:0 auto;
}






  }
`;
