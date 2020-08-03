import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {useRouter} from 'next/router';
import BoardAPI from "../../../api/board";

import WriteBoardForm from '../../../components/Board/WriteBoardForm';


const EditBoard = (props) => {

    // console.log("게시물 수정 props", props.props.board.body);

    return useObserver(() => {

        const router = useRouter();
        const state = useLocalStore(() => {
            return {
                data: props.props.board.body,
                id: props.props.board.body.id,
                writer: props.props.board.body.writer,
                // select: props.board.body.select,
                title: props.props.board.body.title,
                contents: props.props.board.body.contents
            }
        });

        const onSubmitForm = async (e) => {
            e.preventDefault();

            const formData = {
                id: state.id,
                writer: state.writer,
                title: state.title,
                contents: state.contents,
            }

            // console.log("게시물 수정!!!!", formData);

            const boardEditRes = await BoardAPI.edit(formData);

            console.log("글 수정 후 res", boardEditRes);

            // 글목록 or 해당 글로 이동
            router.push('/board/[id]', `/board/${state.id}`);
        }

        const onCancel = (e) => {
            // console.log("새 글 작성 - 취소");
            // 글목록 or 해당 글로 이동
            router.push('/board/[id]', `/board/${state.id}`);
        }	

    
        const onChangeSelect = (e) => {
            // console.log("게시판 선택", e);
            state.select = e;
        }

        const onChangeTitle = (e) => {
            // console.log("title!!!", e.target.value);
            state.title = e.target.value;
        }

        const onChangeEditor = (e) => {
            // input data 변경 
            // console.log("onEditorChange!", e.editor.getData());
            state.contents = e.editor.getData();
        }			      
    
    
      return (

        <WriteBoardForm 
            boardType="게시글 수정"
            // boardSelect={state.select}
            boardTitle={state.title}
            boardContents={state.contents}
            submitBtn="수정"
            onSubmitForm={onSubmitForm} 
            onCancel = {onCancel}
            onChangeSelect = {onChangeSelect}
            onChangeTitle = {onChangeTitle}
            onChangeEditor = {onChangeEditor}
        />

      );
    })
};

EditBoard.getInitialProps = async({ query }) => {

    const boardDetailRes = await BoardAPI.detail({ 
        id: query.id
        });

        console.log("boardDetailRes", boardDetailRes)
    return {
        props: {
        board: boardDetailRes,
        }
    };
  
}

export default EditBoard;