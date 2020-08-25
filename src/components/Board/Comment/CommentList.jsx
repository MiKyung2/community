import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
// import {comment_dummy} from '../comment_dummy';
import EachComment from './EachComment';


const CommentList = (props) => {

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        likes: 0,
        dislikes: 0,
        action: null,
        comments: props.comments
      };
    });

    return (
      <>
        {state.comments && state.comments.map(comment => (
          <EachComment key={comment.id} data={comment} />
        ))}
      </>
    )
  });
}


export default CommentList;
