import React, {createElement, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentAPI from '../../../api/comment';
import CONFIG from '../../../utils/CONFIG';
import CommentList from './CommentList';
import AddComment from './AddComment';


const Comments = (props) => {

    console.log("Comments props", props);

    return useObserver(() => {

        const state = useLocalStore(() => {
            return {
                comments: props.data,
                queryId: props.queryId
            };
        });

        const [TempComments, setComments] = useState(props.data);

        const addTemporaryNewComment = (payload) => {
            // console.log("current comments:", comments)
            // console.log("add new comment", payload);
            // const newTempComments = comments.concat(payload);
            // setComments(newTempComments);

            console.log("current:", TempComments);
            const newTempComments = TempComments.concat(payload);
            console.log("newD:", newTempComments);
            setComments(newTempComments);
        }

        return (
        <>
            {/* <CommentList data={state.comments} /> */}
            <CommentList data={TempComments} />
            <AddComment queryId={state.queryId} addComment={addTemporaryNewComment} />
        </>
        )
});
}


export default Comments;