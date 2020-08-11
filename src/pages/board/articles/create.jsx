import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {useRouter} from 'next/router';
import {CONFIG} from '../../../utils/CONFIG';
import BoardAPI from "../../../api/board";

import WriteBoardForm from '../../../components/Board/WriteBoardForm';

const CreateBoard = (props) => {
    return useObserver(() => {

        const router = useRouter();
        const state = useLocalStore(() => {
            return {
                select: '',
                title: '',
                contents: ''
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

            CONFIG.LOG("새글 submit", formData);

            BoardAPI.write(formData);

            // 글목록 or 해당 글로 이동
            router.push('/board', `/board`);
        }

        const onCancel = (e) => {
            // CONFIG.LOG("새 글 작성 - 취소");
            // 글목록 or 해당 글로 이동
            router.push('/board', `/board`);
        }	

    
        const onChangeSelect = (e) => {
            // CONFIG.LOG("게시판 선택", e);
            state.select = e;
        }

        const onChangeTitle = (e) => {
            // CONFIG.LOG("title!!!", e.target.value);
            state.title = e.target.value;
        }

        const onChangeEditor = (e) => {
            // input data 변경 
            // CONFIG.LOG("onEditorChange!", e.editor.getData());
            const dataFromEditor =  e.editor.getData();
            state.contents = dataFromEditor;
        }
    
       			      
    
    
      return (

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
        
      );
    })
};

export default CreateBoard;