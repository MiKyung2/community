import { useLocalStore, useObserver } from 'mobx-react';
import {toJS} from 'mobx';
import React from 'react';
// import {comment_dummy} from '../comment_dummy';
import EachComment from './EachComment';


const CommentList = (props) => {

  const { comments, deleteComment, isAdmin } = props;


  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        likes: 0,
        dislikes: 0,
        action: null,
        comments
      };
    });

    const updateComments = (commentToDelete) => {
      deleteComment(commentToDelete);
    }

    return (
      <>
        {state.comments && state.comments.map(comment => (
          <EachComment key={comment.id} data={comment} updateComments={updateComments} isAdmin={isAdmin} />
        ))}
      </>
    )
  });
}


export default CommentList;
