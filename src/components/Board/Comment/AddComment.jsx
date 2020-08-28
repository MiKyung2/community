import React, { useState, useEffect } from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import CommentAPI from '../../../api/comment';
import UserAPI from "../../../api/user";


const AddComment = (props) => {

  const { queryId, comments } = props;
  const router = useRouter();

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
          content: '',
          user: [],
          visible: false
      }
  });

  // 유저 정보
  const [cookies, _, removeCookie] = useCookies(['token', 'id']);

  useEffect(() => {
    const getUserInfo = async() => {
      if(!cookies.token) return;
      const userInfo = await UserAPI.get({id: cookies.id});            
      state.user = userInfo.body; 
    };
    getUserInfo();
  }, []);

    const registerComment = async () => {
      const payload = {
        boardId: queryId,
        title: 'title',
        content: state.content,
        writer: state.user.nickname,
        id: 0,
        itemGb: "string",
        rowDisLike: 0,
        rowLike: 0,
        viewCount: 0
      }
      const resp = await CommentAPI.post(payload);
      comments.push(resp.body);
    }

    const onChangeTextArea = (e) => {
      state.content = e.target.value;
    }

    const onSubmitComment = (e) => {
      e.preventDefault();
      if(cookies.token) {
        registerComment();
        state.content = '';
      } else {
        state.visible = true;
      }
    }

    const handleCancel = (e) => {
      state.visible = false;
      // state.content = '';
    }

    const handleOk = () => {
      router.push('/accounts/signin');
    }

    

    return (
      <>
      <div className={props.className}>
        <form>
          <textarea className="text-area" value={state.content} onChange={onChangeTextArea} />
          <button type="submit" className="submit-btn" onClick={onSubmitComment}>등록</button>
        </form>
      </div>

      {/* 로그인 메세지 */}
      <Modal
      visible={state.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      >
      <p>
        댓글을 등록하려면 로그인 해주세요.
        로그인 페이지로 이동하시겠습니까?
      </p>
     </Modal>
     </>
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
