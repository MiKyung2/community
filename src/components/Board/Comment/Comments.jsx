import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
import { toJS } from 'mobx';

import AddComment from './AddComment';
import CommentList from './CommentList';

const Comments = (props) => {
  return useObserver(() => {
    const { isAdmin } = props;
    const state = useLocalStore(() => {
      return {
        comments: props.data,
        queryId: props.queryId,
      };
    });

    const deleteComment = (commentToDelete) => {
      const currentComments = toJS([...state.comments]);
      const updatedComments = currentComments.filter((comment) => comment.id !== commentToDelete);
      state.comments.splice(0, currentComments.length, ...updatedComments);
    };

    return (
      <>
        <CommentList comments={state.comments} deleteComment={deleteComment} isAdmin={isAdmin} />
        <AddComment queryId={state.queryId} comments={state.comments} isAdmin={isAdmin} />
      </>
    );
  });
};

export default Comments;
