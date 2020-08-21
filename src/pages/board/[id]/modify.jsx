import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {useRouter} from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import BoardAPI from "../../../api/board";
import { Modal } from 'antd';


import WriteBoardForm from '../../../components/Board/WriteBoardForm';


const EditBoard = (props) => {

    // CONFIG.LOG("게시물 수정 props", props.props.board.body);

    return useObserver(() => {

        const router = useRouter();
        const state = useLocalStore(() => {
            return {
                data: props.props.board.body,
                id: props.props.board.body.id,
                writer: props.props.board.body.writer,
                // select: props.board.body.select,
                title: props.props.board.body.title,
                contents: props.props.board.body.contents,
                modal: {
                    visible: false
                }
            }
        });

        const onSubmitForm = (e) => {
            e.preventDefault();

            const formData = {
                id: state.id,
                writer: state.writer,
                title: state.title,
                contents: state.contents,
            }

            const boardEditRes = async() => await BoardAPI.edit(formData);
            boardEditRes();

            router.push('/board/[id]', `/board/${state.id}`);
        }

        const onCancel = () => {
            state.modal.visible = true;
        }	

        const handleOk = () => {
            router.push('/board/[id]', `/board/${state.id}`);
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
            state.contents = e.editor.getData();
        }	
        
    
    
      return (
        <>
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

        {/* 취소 확인 메세지 */}
        <Modal 
        visible={state.modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <p>정말 게시글 수정을 취소하시겠습니까?</p>
        </Modal>
      </>

      );
    })
};

EditBoard.getInitialProps = async({ query }) => {

    const boardDetailRes = await BoardAPI.detail({ 
        id: query.id
    });

    return {
        props: {
        board: boardDetailRes,
        }
    };
  
}

export default EditBoard;