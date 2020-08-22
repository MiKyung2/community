import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {useRouter} from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import BoardAPI from "../../../api/board";
import { Modal } from 'antd';

import WriteBoardForm from '../../../components/Board/WriteBoardForm';

const CreateBoard = (props) => {
    return useObserver(() => {

        const router = useRouter();
        const state = useLocalStore(() => {
            return {
                select: '',
                title: '',
                contents: '',
                modal: {
                    visible: false
                }
            }
        });

        const onSubmitForm = (e) => {
            e.preventDefault();

            const formData = {
                // id: 1,
                writer: "ally",
                // select: state.select,
                title: state.title,
                contents: state.contents,
            }

            BoardAPI.write(formData);

            router.push('/board', `/board`);
        }

        const onCancel = (e) => {
            state.modal.visible = true;
        }	

        const handleOk = () => {
            router.push('/board', `/board`);
        }

        const handleCancel = () => {
            state.modal.visible = false;
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
        visible={state.modal.visible}
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