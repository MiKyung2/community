import React, {createElement, useEffect} from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentAPI from '../../../api/comment';
import CONFIG from '../../../utils/CONFIG';
import moment from 'moment';
// import {comment_dummy} from '../comment_dummy';
import EachComment from './EachComment';


const CommentList = ({queryId}) => {

  return useObserver(() => {

    const state = useLocalStore(() => {
        return {
            likes: 0,
            dislikes: 0,
            action: null,
            comments: []
        };
    });

    useEffect(() => {
      const commentList = async() => { 
        const comments = await CommentAPI.get({ 
            id: queryId
        });
        console.log("comment res", comments.body);
        state.comments = comments.body;
      };
      commentList();
    }, []);

    return (
      <>
      {state.comments && state.comments.map(comment => (
        <EachComment data={comment} />
      ))}
      </>
    )
});
}


// CommentList.getInitialProps = async({ query }) => {

  
//   const commentList = await CommentAPI.get({ 
//     id: query.id
//   });

//   console.log("hi comment list?", commentList);
//   return {
//     props: {
//       comments: commentList,
//     }
//   };
// }

export default CommentList;