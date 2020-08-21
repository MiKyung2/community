import React, {createElement, useEffect} from 'react';
import styled from 'styled-components';
import { Comment, Tooltip, Avatar, Modal } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentAPI from '../../../api/comment';
import CONFIG from '../../../utils/CONFIG';
import moment from 'moment';
// import {comment_dummy} from '../comment_dummy';


const EachComment = (props) => {

  const { data } = props;

  return useObserver(() => {

    const state = useLocalStore(() => {
        return {
            likes: 0,
            dislikes: 0,
            action: null,
            comment: {
              writer: '',
              contents: '',
              likes: 0,
              dislikes: 0
            },
            modal: {
              visible: false
            }
        };
    });

    useEffect(() => {
      state.comment.writer = data.writer;
      state.comment.contents = data.title;
      state.comment.likes = data.rowLike;
      state.comment.dislikes = data.rowDisLike;
    }, []);

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

    const handleOk = () => {
      const deleteComment = async() => await CommentAPI.delete({id: data.id});
      deleteComment();
      state.modal.visible = false;
    }

    const handleCancel = () => {
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
      <span key="comment-basic-delete-btn" onClick={onDelete}>삭제</span>,
    ];
  


    return (
      <div className={props.className}>
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
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
        />
        {/* 삭제 확인 메세지 */}
        <Modal 
        visible={state.modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <p>정말 이 댓글을 삭제하시겠습니까?</p>
        </Modal>
      </div>
    )
});
}


// CommentList.getInitialProps = async({ query }) => {

  
//   const commentList = await CommentAPI.get({ 
//     id: query.id
//   });

//   console.log("hi comment list?", commentList);
//   return {
//     props: {
//       comments: commentList,
//     }
//   };
// }

export default styled(EachComment)`
  /* border: 1px solid green; */

`;