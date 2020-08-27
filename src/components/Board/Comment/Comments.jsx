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
        return (
            <>
                {/* <CommentList data={state.comments} /> */}
                <CommentList comments={state.comments} />
                <AddComment queryId={state.queryId} comments={state.comments} />
            </>
        )
    });
}


export default Comments;
