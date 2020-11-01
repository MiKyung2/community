import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
import EachComment from './EachComment';

const CommentList = (props) => {
  const { comments, deleteComment, isAdmin } = props;
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        likes: 0,
        dislikes: 0,
        action: null,
        comments,
      };
    });

    const updateComments = (commentToDelete) => {
      deleteComment(commentToDelete);
    };

    return (
      <>
        {state.comments && state.comments.map((comment) => {
          return (
            <EachComment
              key={comment.id}
              data={comment}
              updateComments={updateComments}
              isAdmin={isAdmin}
            />
          );
        })}
      </>
    );
  });
};

export default CommentList;
