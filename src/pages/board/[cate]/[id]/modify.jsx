import React, { useEffect } from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {useRouter} from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import { Modal } from 'antd';
import BoardAPI from "../../../../api/board";
import WriteBoardForm from '../../../../components/Board/WriteBoardForm';
import Modal_cancel from '../../../../components/Board/Modals/Modal_cancel';


const EditBoard = (props) => {

    return useObserver(() => {
        const router = useRouter();

        const boardCate = props.props.boardCate;
        const boardId = props.props.boardId;
        let boardName;

        switch(boardCate) {
            case "free":
                boardName = "자유게시판"
                break;
            case "noti":
                boardName = "공지사항"
                break;
            case "qna":
                boardName = "Q&A"
                break;
            case "recruit":
                boardName = "구인게시판"
                break;
            case "resumes":
                boardName = "구직게시판"
                break;
            case "secret":
                boardName = "비밀게시판"
                break;
            default:
        }

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

        useEffect(() => {
  
            window.onpopstate = () => {
                  state.modal.cancel = true;
                  history.go(1);
              };
            
        }, []);

        const onSubmitForm = (e) => {
            e.preventDefault();

            if (state.title.trim() == '' || state.contents.trim() == '') {
                warning();
            } else {
                const formData = {
                    id: state.id,
                    writer: state.writer,
                    title: state.title,
                    contents: state.contents,
                }
    
                const boardEditRes = async() => await BoardAPI.edit(formData);
                boardEditRes();
    
                router.replace('/board/[cate]/[id]', `/board/${boardCate}/${boardId}`);
            }

        }

        const warning = () => {
            Modal.warning({
              content: '제목과 내용을 입력해 주세요.'
            })
        }

        const onCancel = () => {
            state.modal.visible = true;
        }	

        const handleOk = () => {
            router.push('/board/[cate]/[id]', `/board/${boardCate}/${boardId}`);
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
            boardName = {boardName}
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
        <Modal_cancel 
            isCancel={state.modal.visible}
            handleOk={handleOk}
            handleCancel={handleCancel} 
        />
      </>

      );
    })
};

EditBoard.getInitialProps = async(ctx) => {

    const query = ctx.query

    const boardDetailRes = await BoardAPI.detail({ 
        id: query.id
    });

    return {
        props: {
        board: boardDetailRes,
        boardCate: query.cate,
        boardId: query.id
        }
    };
  
}

export default EditBoard;