import React, {useEffect} from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {toJS} from 'mobx';
import {useRouter} from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import BoardAPI from "../../../api/board";
import UserAPI from "../../../api/user";
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';


import WriteBoardForm from '../../../components/Board/WriteBoardForm';
import Axios from 'axios';

const CreateBoard = (props) => {
    return useObserver(() => {

        const router = useRouter();
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
        const [cookies, _, removeCookie] = useCookies(['token', 'id']);

        useEffect(() => {
          const getUserInfo = async() => {
            const userInfo = await UserAPI.get({id: cookies.id});            
            state.user = userInfo.body;
          };
          getUserInfo();
          
        }, [])



        const onSubmitForm = async(e) => {
            e.preventDefault();
        
            if (state.title.trim() == '' || state.contents.trim() == '') {
                warning();
            } else {
                const formData = {
                    writer: state.user.nickname ? state.user.nickname : "unknown",
                    // select: state.select,
                    title: state.title,
                    contents: state.contents,
                }
                await BoardAPI.write(formData);
                router.push('/board', `/board`);
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
            router.push('/board', `/board`);
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
        <Modal 
        visible={state.modal.cancel}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <p>정말 작성을 취소하시겠습니까?</p>
        </Modal>

        </>
        
      );
    })
};

export default CreateBoard;