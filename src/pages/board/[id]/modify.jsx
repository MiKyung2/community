import React from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { Select, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CKEditor from 'ckeditor4-react';
import {useRouter} from 'next/router';
import BoardAPI from "../../../api/board";

const { Option } = Select;


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

        const onSubmitEditForm = async (e) => {
            e.preventDefault();

            const formData = {
                id: state.id,
                writer: state.writer,
                title: state.title,
                contents: state.contents,
            }

            console.log("게시물 수정!!!!", formData);

            const boardEditRes = await BoardAPI.edit(formData);

            console.log("글 수정 후 res", boardEditRes);

            // 글목록 or 해당 글로 이동
            router.push('/board/[id]', `/board/${state.id}`);
        }

        const onCancel = (e) => {
            console.log("새 글 작성 - 취소");
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
        <div className={props.className}>
            <div className="container">
                <header className="header">
					<h2>게시물 수정</h2>
					<Avatar size="large" icon={<UserOutlined />} />
                </header>
    
                <section>
                    <form onSubmit={onSubmitEditForm}>
                        {/* 게시판 선택 */}
                        <Select defaultValue="default" className="select" onChange={onChangeSelect}>
                            <Option value="default">게시판을 선택해주세요.</Option>
                            <Option value="option1">Option1</Option>
                            <Option value="option2">Option2</Option>
                            <Option value="option3">Option3</Option>
                        </Select>
                        
                        {/* 게시판 제목 */}
                        <Input value={state.title} onChange={onChangeTitle} className="input" placeholder="제목을 입력해주세요." />
                        
                        {/* 게시판 내용 */}
                        <CKEditor
                        data={state.contents}
                        onChange={onChangeEditor}
                        className="editor"
                        />
    
                        {/* 버튼 - 등록 & 취소 */}
                        <div className="buttons">
                            <Button type="default" onClick={onCancel}>취소</Button>
                            <Button type="primary" htmlType="submit">수정</Button>
                        </div>
                    </form>
                </section>    
            </div>
        </div>
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

export default styled(EditBoard)`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    & {
        .container {
            width: 80%;
        }
        .header {
            /* border: 1px solid red; */
            display: flex;
            justify-content: space-between; 
            align-items: center;
            margin-bottom: 40px;
        }
        .select {
            width: 100%;
            margin-bottom: 15px;
        }
        .input {
            width: 100%;
            margin-bottom: 15px;
        }
        .editor {
            margin-bottom: 30px;
        }
        .buttons {
            display: flex; 
            justify-content: space-between;
            align-items: center;
        }
    }
`;