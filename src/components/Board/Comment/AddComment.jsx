// import { Form, Button, List, Input, Avatar, Comment } from 'antd';
import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import CommentAPI from '../../../api/comment';

// const { TextArea } = Input;

const AddComment = (props) => {

  const { queryId, comments } = props;

  return useObserver(() => {

    const [content, setContent] = useState('');

    const registerComment = async () => {
      const payload = {
        boardId: queryId,
        title: 'title',
        content: content,
        writer: 'allly',
        id: 0,
        itemGb: "string",
        rowDisLike: 0,
        rowLike: 0,
        viewCount: 0
      }
      const resp = await CommentAPI.post(payload);
      comments.push(resp.data.body);
    }

    const onChangeTextArea = (e) => {
      // state.value = e.target.value;
      setContent(e.target.value);
    }

    const onSubmitComment = (e) => {
      e.preventDefault();
      registerComment();
      setContent('');
    }

    return (
      <div className={props.className}>
        <form>
          <textarea className="text-area" value={content} onChange={onChangeTextArea} />
          <button type="submit" className="submit-btn" onClick={onSubmitComment}>등록</button>
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
