import React, {createElement, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentAPI from '../../../api/comment';
import CONFIG from '../../../utils/CONFIG';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { toJS } from 'mobx';


const Comments = (props) => {

    return useObserver(() => {

        const state = useLocalStore(() => {
            return {
                comments: props.data,
                queryId: props.queryId
            };
        });

        // console.log("Comments state:", toJS(state.comments));

        // const [TempComments, setComments] = useState(props.data);

        const addTemporaryNewComment = (payload) => {
            // console.log("current comments:", comments)
            // console.log("add new comment", payload);
            // const newTempComments = comments.concat(payload);
            // setComments(newTempComments);

            const currentComments = toJS(state.comments)

            console.log("current:", currentComments);
            const newTempComments = currentComments.concat(payload);
            console.log("newD:", newTempComments);
            // setComments(newTempComments);
            state.comments = currentComments.concat(payload);
            
        }

        return (
        <>
            <CommentList data={state.comments} />
            {/* <CommentList data={TempComments} /> */}
            <AddComment queryId={state.queryId} addComment={addTemporaryNewComment} />
        </>
        )
    });
}


export default Comments;