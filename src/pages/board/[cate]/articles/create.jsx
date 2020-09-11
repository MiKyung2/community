import React, {useEffect} from 'react';
import Axios from 'axios';
import { useObserver, useLocalStore } from 'mobx-react';
import {toJS} from 'mobx';
import {useRouter} from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import BoardAPI from "../../../../api/board";
import UserAPI from "../../../../api/user";
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';
// import cookie from 'cookie';
// import jwt from "jsonwebtoken";


import WriteBoardForm from '../../../../components/Board/WriteBoardForm';
import { AppContext } from '../../../../components/App/context';
import Modal_cancel from '../../../../components/Board/Modals/Modal_cancel';

const CreateBoard = (props) => {
    return useObserver(() => {

        const router = useRouter();
        const boardCate = router.query.cate;
        let boardType;
        let boardName;

        switch(boardCate) {
            case "free":
                boardType = "FREE"
                boardName = "자유게시판"
                break;
            case "noti":
                boardType = "NOTICE"
                boardName = "공지사항"
                break;
            case "qna":
                boardType = "QNA"
                boardName = "Q&A"
                break;
            case "recruit":
                boardType = "JOB_OFFER"
                boardName = "구인게시판"
                break;
            case "resumes":
                boardType = "JOB_SEARCH"
                boardName = "구직게시판"
                break;
            case "secret":
                boardType = "SECRET"
                boardName = "비밀게시판"
                break;
            default:
        }

        const state = useLocalStore(() => {
            return {
                select: '',
                title: '',
                contents: '',
                modal: {
                    cancel: false
                },
                user: []
            }
        });


        // 글쓰는 유저 정보 가져오기
        const global = React.useContext(AppContext);

        useEffect(() => {
          const getUserInfo = async() => {
            const userInfo = await UserAPI.get({ userId: encodeURI(global.state.user.userId) });   
            state.user = userInfo.body;
          };
          getUserInfo();

          window.onpopstate = () => {
                state.modal.cancel = true;
                history.go(1);
            };
          
        }, []);


        const onSubmitForm = async(e) => {
            e.preventDefault();
        
            if (state.title.trim() == '' || state.contents.trim() == '') {
                warning();
            } else {
                const formData = {
                    board_type: boardType,
                    writer: state.user.userId ? state.user.userId : "unknown",
                    // select: state.select,
                    title: state.title,
                    contents: state.contents,
                }
                console.log("글쓰기 제출:", formData)
                await BoardAPI.write(formData);
                router.push('/board/[cate]', `/board/${boardCate}`);
            }


        }

        const warning = () => {
            Modal.warning({
              content: '제목과 내용을 입력해 주세요.'
            })
        }

        const onCancel = (e) => {
            state.modal.cancel = true;
        }	

        const handleOk = () => {
            router.push('/board/[cate]', `/board/${boardCate}`);
        }

        const handleCancel = () => {
            state.modal.cancel = false;
        }

    
        const onChangeSelect = (e) => {
            state.select = e;
        }

        const onChangeTitle = (e) => {
            state.title = e.target.value;
        }

        const onChangeEditor = (e) => {
            const dataFromEditor =  e.editor.getData();
            state.contents = dataFromEditor;
        }
    
       			      
    
    
      return (
        <>

        <WriteBoardForm 
            boardName={boardName}
            boardType="새 글 작성"
            // boardSelect={state.select}
            boardTitle={state.title}
            boardContents={state.contents}
            submitBtn="등록"
            onSubmitForm={onSubmitForm} 
            onCancel = {onCancel}
            onChangeSelect = {onChangeSelect}
            onChangeTitle = {onChangeTitle}
            onChangeEditor = {onChangeEditor}
        />

        {/* 취소 확인 메세지 */}
        <Modal_cancel 
            isCancel={state.modal.cancel} 
            handleOk={handleOk} 
            handleCancel={handleCancel} 
        />

        </>
        
      );
    })
};

export default CreateBoard;