import React from 'react';
import styled from 'styled-components';
// import { Form, Button, List, Input, Avatar, Comment } from 'antd';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentAPI from '../../../api/comment';
// import {CONFIG} from '../../../utils/CONFIG';
import moment from 'moment';

// const { TextArea } = Input;

const AddComment = (props) => {

  const {addComment} = props;
    
    return useObserver(() => {

      const state = useLocalStore(() => {
          return {
            value: ''
          };
      });


      const registerComment = async() => {
        const payload = {
          boardId: props.queryId,
          title: 'title',
          content: state.value,
          writer: 'allly',
          id: 0,
          itemGb: "string",
          rowDisLike: 0,
          rowLike: 0,
          viewCount: 0
        }
        // const postComment = await CommentAPI.post(payload);
        const postComment = async() => await CommentAPI.post(payload);
        // console.log("등록됨:",postComment);
        postComment();
        addComment(payload);
      }

      const onChangeTextArea = (e) => {
        state.value = e.target.value;
      }

      const onSubmitComment = (e) => {
        e.preventDefault();
        registerComment();        
        state.value = "";
      }

      return (
        <div className={props.className}>
          <form onSubmit={onSubmitComment}>
            <textarea className="text-area" value={state.value} onChange={onChangeTextArea} />
            <button type="submit" className="submit-btn">등록</button>
          </form>
        </div>
      )
    
    });



}

export default styled(AddComment)`
  margin-bottom: 50px;
  & {
    .text-area {
      width: 100%;
      height: 100px;
      border-radius: 5px;
      padding: 20px;
    }
    .submit-btn {
      cursor: pointer;
      border-radius: 5px;
      background-color: #1890FF;
      color: #fff;
      padding: 10px 20px;
       margin-top: 5px;
    }
  }
`;