import React, {createElement, useEffect} from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentAPI from '../../../api/comment';
import CONFIG from '../../../utils/CONFIG';
import moment from 'moment';
// import {comment_dummy} from '../comment_dummy';
import EachComment from './EachComment';


const CommentList = (props) => {

  return useObserver(() => {

    const state = useLocalStore(() => {
        return {
            likes: 0,
            dislikes: 0,
            action: null,
            comments: props.data
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