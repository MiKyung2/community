import React, { useEffect } from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import CommentAPI from '../../../api/comment';
import UserAPI from "../../../api/user";
import { AppContext } from '../../App/context';
import Modal_login from '../Modals/Modal_login';
// import { useCookies } from 'react-cookie';


const AddComment = (props) => {

  return useObserver(() => {
    const global = React.useContext(AppContext);
    const globalUserInfo = global.state.user;
    const { isAdmin } = props;

    const { queryId, comments } = props;
    const router = useRouter();

    const state = useLocalStore(() => {
      return {
          content: '',
          user: [],
          modal: {
            login: false,
          }
      }
  });

  // 유저 정보

  useEffect(() => {
    const getUserInfo = async() => {
      if(!globalUserInfo.token) return;
      const userInfo = await UserAPI.get({userId: encodeURI(global.state.user.userId)});  
      state.user = userInfo.body; 
    };
    getUserInfo();
  }, []);

    const registerComment = async () => {
      const payload = {
        boardId: queryId,
        title: 'title',
        content: state.content,
        writer: state.user.userId,
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

    const warning = () => {
      Modal.warning({
        content: '댓글 내용을 입력해 주세요.'
      })
    }

    const onSubmitComment = (e) => {
      e.preventDefault();
      
      if (!globalUserInfo.token) {
        state.modal.login = true;
      } else {
        if (state.content.trim() == '') {
          warning();
          state.content = '';
        } else {
          registerComment();
          state.content = '';
        }
      }
    }

    const handleCancel_LoginModal = (e) => {
      state.modal.login = false;
    }

    const handleOk_LoginModal = () => {
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
      <Modal_login 
        isLogin={state.modal.login} 
        handleOk={handleOk_LoginModal} 
        handleCancel={handleCancel_LoginModal} 
      />
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
