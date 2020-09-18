import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Modal, Tooltip } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import {toJS} from 'mobx';
import { useRouter } from 'next/router';

import moment from 'moment';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import CommentAPI from '../../../api/comment';
import UserAPI from '../../../api/user';
import { AppContext } from '../../App/context';


const EachComment = (props) => {

  const { data, updateComments } = props; 
  
  return useObserver(() => {
    const router = useRouter();
    const global = React.useContext(AppContext);
    const { isAdmin } = props;

    const state = useLocalStore(() => {
      return {
        likes: 0,
        dislikes: 0,
        action: null,
        comment: {
          writer: '',
          contents: '',
          createdDate: '',
          img: '',
          likes: 0,
          dislikes: 0
        },
        modal: {
          delete: false,
          login: false
        },
        userData: [],
        user: '',
        isWriter: false,
        login: false
      };
    });

    useEffect(() => {
      state.comment.writer = data.writer;
      state.comment.contents = data.title;
      state.comment.img = data.profileImg;
      state.comment.createdDate = data.createdDate;
      state.comment.likes = data.rowLike;
      state.comment.dislikes = data.rowDisLike;

      // 유저 정보
      const getUserInfo = async() => {
        if(!global.state.user.userId) {
          state.login = false;
        } else {
          const userInfo = await UserAPI.get({ userId: encodeURI(global.state.user.userId) });    
          state.userData = userInfo.body;  
          state.user = userInfo?.body.userId ? userInfo.body.userId : '';
          state.login = true;
        }
      };
      getUserInfo();
    }, []);

    const setLogin = () => {
      if(state.comment.writer === state.user) {
        state.isWriter = true
      } else {
        state.isWriter = false
      }
    }
    setLogin();

    const onLike = async() => {
      if (state.login) {
        await CommentAPI.event({ id: data.id, itemGb: "L" });
        state.action = 'liked'
        state.comment.likes = state.comment.likes + 1;
        // state.comment.dislikes = state.comment.dislikes - 1;
      } else {
        return;
      }
    };

    const onDislike = async() => {
      if (state.login) {
        await CommentAPI.event({ id: data.id, itemGb: "D" });
        state.action = 'disliked'
        state.comment.dislikes = state.comment.dislikes + 1;
        // state.comment.likes = state.comment.likes - 1;
      } else {
        return;
      }
    };

    const onDelete = () => {
      state.modal.delete = true;
    };

    const handleOk_delete = () => {
      const deleteComment = async () => await CommentAPI.delete({ id: data.id });
      deleteComment();
      state.modal.delete = false;
      const currentCommentId = data.id;
      updateComments(currentCommentId);
    }

    const handleCancel_delete = () => {
      state.modal.delete = false;
    }

    const checkAdmin = () => {

      let actions;

      if (isAdmin === 'A') {
         actions = [
          <span key="comment-basic-like">
            <Tooltip title={"좋아요"}>
              <span onClick={onLike}>{state.action === 'liked' ? <LikeFilled /> : <LikeOutlined />}</span>
            </Tooltip>
            <span className="comment-action">{state.comment.likes}</span>
          </span>,
          <span key="comment-basic-dislike">
            <Tooltip title={"로그인 해주세요"}>
              <span onClick={onDislike}>{state.action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}</span>
            </Tooltip>
            <span className="comment-action">{state.comment.dislikes}</span>
          </span>,
          // <span key="comment-basic-reply-to">Reply to</span>,
          <span key="comment-basic-delete-btn" onClick={onDelete}>삭제</span>
        ];
      } else {
        actions = [
          <span key="comment-basic-like">
            <Tooltip title={state.login ? "좋아요" : "로그인 해주세요"}>
              <span onClick={onLike}>{state.action === 'liked' ? <LikeFilled /> : <LikeOutlined />}</span>
            </Tooltip>
            <span className="comment-action">{state.comment.likes}</span>
          </span>,
          <span key="comment-basic-dislike">
            <Tooltip title={state.login ? "싫어요" : "로그인 해주세요"}>
              <span onClick={onDislike}>{state.action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}</span>
            </Tooltip>
            <span className="comment-action">{state.comment.dislikes}</span>
          </span>,
          // <span key="comment-basic-reply-to">Reply to</span>,
          state.isWriter ? <span key="comment-basic-delete-btn" onClick={onDelete}>삭제</span> : null
        ];
      }

      return actions;
    }

    // 작성자 프로필로 이동
    const moveToWriterProfile = () => {
      if (global.state.user.role === 'A' || state.login) {
        router.push("/profile/[userId]", `/profile/${state.comment.writer}`);
      } else {
        return;
      }
    }

    const writer = () => {
      let title;
      if(global.state.user.role === 'A' || state.login) {
        title = "프로필 이동"
      } else {
        title = "로그인 해 주세요";
      }
    
    return <Tooltip title={title}>
      <span className="hover" onClick={moveToWriterProfile}>{state.comment.writer}</span>
    </Tooltip>

    }



    return (
      <div>
        <Comment
          actions={checkAdmin()}
          author={writer()}
          avatar={
            <Avatar
              src={state.comment.img}
              alt="profile img"
            />
          }
          content={
            <p>
              {state.comment.contents}
            </p>
          }
          datetime={
            <Tooltip title={moment(state.comment.createdDate).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(state.comment.createdDate).fromNow()}</span>
            </Tooltip>
          }
        />

        {/* 삭제 확인 메세지 */}
        <Modal
          visible={state.modal.delete}
          onOk={handleOk_delete}
          onCancel={handleCancel_delete}
        >
          <p>정말 이 댓글을 삭제하시겠습니까?</p>
        </Modal>
      </div>
    )
  });
}

export default styled(EachComment)`
  /* border: 1px solid green; */
  & {
    .hover {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
