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


import WriteBoardForm from '../../../../components/Board/WriteBoardForm';
import { AppContext } from '../../../../components/App/context';
import Modal_cancel from '../../../../components/Board/Modals/Modal_cancel';

const CreateBoard = (props) => {
    return useObserver(() => {

        const router = useRouter();
        const boardCate = router.query.cate;

        // console.log("create router", router.query.cate);

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
        // const [cookies, _, removeCookie] = useCookies(['token', 'id']);
        const global = React.useContext(AppContext);

        useEffect(() => {
          const getUserInfo = async() => {
            const userInfo = await UserAPI.get({id: global.state.user.userId});   
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