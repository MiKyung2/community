import React, {createElement} from 'react';
import styled from 'styled-components';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import moment from 'moment';
// import {comment_dummy} from '../comment_dummy';


const CommentList = () => {

return useObserver(() => {

    const state = useLocalStore(() => {
        return {
            likes: 0,
            dislikes: 0,
            action: null,
        };
    });

    const like = () => {
        // CONFIG.LOG("like clicked!");
        state.likes = 1;
        state.dislikes = 0;
        state.action = 'liked'
      };
  
      const dislike = () => {
        // CONFIG.LOG("dislike clicked!");
        state.likes = 0;
        state.dislikes = 1;
        state.action = 'disliked'
      };
  
      const actions = [
          <span key="comment-basic-like">
          <Tooltip title="Like">
            {createElement(state.action === 'liked' ? LikeFilled : LikeOutlined, {
              onClick: like,
            })}
          </Tooltip>
          <span className="comment-action">{state.likes}</span>
        </span>,
        <span key="comment-basic-dislike">
          <Tooltip title="Dislike">
            {React.createElement(state.action === 'disliked' ? DislikeFilled : DislikeOutlined, {
              onClick: dislike,
            })}
          </Tooltip>
          <span className="comment-action">{state.dislikes}</span>
        </span>,
        <span key="comment-basic-reply-to">Reply to</span>
      ];
  


    return (
        <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
        />
    )

});

}

export default CommentList;

// 댓글 가져와야 하는 정보들

// comments: [
//     {
//       author: 'Han Solo',
//       avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//       content: <p>{this.state.value}</p>,
//       datetime: moment().fromNow(),
//     },
//     ...this.state.comments,
//   ],