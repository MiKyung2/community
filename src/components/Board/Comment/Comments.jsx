import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
import AddComment from './AddComment';
import { toJS } from 'mobx';
import CommentList from './CommentList';


const Comments = (props) => {
    return useObserver(() => {
        const state = useLocalStore(() => {
            return {
                comments: props.data,
                queryId: props.queryId
            };
        });

        const deleteComment = (commentToDelete) => {
            const currentComments = toJS([...state.comments]);
            const updatedComments = currentComments.filter(comment => comment.id !== commentToDelete);
            state.comments.splice(0, currentComments.length, ...updatedComments);
        }

        return (
            <>
                {/* <CommentList data={state.comments} /> */}
                <CommentList comments={state.comments} deleteComment={deleteComment} />
                <AddComment queryId={state.queryId} comments={state.comments} />
            </>
        )
    });
}


export default Comments;
