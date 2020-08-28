import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Modal, Tooltip } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import {toJS} from 'mobx';
import { useCookies } from 'react-cookie';

import moment from 'moment';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import CommentAPI from '../../../api/comment';
import UserAPI from '../../../api/user';


const EachComment = (props) => {

  const { data, updateComments } = props;  

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        likes: 0,
        dislikes: 0,
        action: null,
        comment: {
          writer: '',
          contents: '',
          createdDate: '',
          likes: 0,
          dislikes: 0
        },
        modal: {
          visible: false
        },
        userData: [],
        user: '',
        login: false
      };
    });

    const [cookies, _, removeCookie] = useCookies(['token', 'id']);

    useEffect(() => {
      state.comment.writer = data.writer;
      state.comment.contents = data.title;
      state.comment.createdDate = data.createdDate;
      state.comment.likes = data.rowLike;
      state.comment.dislikes = data.rowDisLike;

      // 유저 정보
      const getUserInfo = async() => {
        if(!cookies.token) return;
        const userInfo = await UserAPI.get({id: cookies.id});    
        state.userData = userInfo.body;      
        state.user = userInfo?.body.nickname ? userInfo.body.nickname : '';
      };
      getUserInfo();
    }, []);

    const setLogin = () => {
      if(state.comment.writer === state.user) {
        state.login = true
      } else {
        state.login = false
      }
    }
    setLogin();

    const onLike = () => {
      state.likes = 1;
      state.dislikes = 0;
      state.action = 'liked'
    };

    const onDislike = () => {
      state.likes = 0;
      state.dislikes = 1;
      state.action = 'disliked'
    };

    const onDelete = () => {
      state.modal.visible = true;
    };

    const handleOk_delete = () => {
      const deleteComment = async () => await CommentAPI.delete({ id: data.id });
      deleteComment();
      state.modal.visible = false;
      const currentCommentId = data.id;
      updateComments(currentCommentId);
    }

    const handleCancel_delete = () => {
      state.modal.visible = false;
    }

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <span onClick={onLike}>{state.action === 'liked' ? <LikeFilled /> : <LikeOutlined />}</span>
        </Tooltip>
        <span className="comment-action">{state.comment.likes}</span>
      </span>,
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <span onClick={onDislike}>{state.action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}</span>
        </Tooltip>
        <span className="comment-action">{state.comment.dislikes}</span>
      </span>,
      // <span key="comment-basic-reply-to">Reply to</span>,
      state.login ? <span key="comment-basic-delete-btn" onClick={onDelete}>삭제</span> : null
    ];



    return (
      <div>
        <Comment
          actions={actions}
          author={<a>{state.comment.writer}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
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
          visible={state.modal.visible}
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

`;
