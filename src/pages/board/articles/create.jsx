import React from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { Select, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CKEditor from 'ckeditor4-react';
import {useRouter} from 'next/router';
import BoardAPI from "../../../api/board";

const { Option } = Select;
const CreateBoard = (props) => {
    return useObserver(() => {

        const router = useRouter();
        const state = useLocalStore(() => {
            return {
                select: '',
                title: '',
                content: ''
            }
        });

        const onSubmitForm = (e) => {
            e.preventDefault();

            const formData = {
                // id: 1,
                writer: "ally",
                // select: state.select,
                title: state.title,
                contents: state.content,
            }

            BoardAPI.write(formData);

            // 글목록 or 해당 글로 이동
            router.push('/board', `/board`);
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
            state.content = e.editor.getData();
        }
    
        const onCancel = (e) => {
            console.log("새 글 작성 - 취소");
            // 글목록 or 해당 글로 이동
            router.push('/board', `/board`);
        }				      
    
    
      return (
        <div className={props.className}>
            <div className="container">
                <header className="header">
					<h2>새 글 작성</h2>
					<Avatar size="large" icon={<UserOutlined />} />
                </header>
    
                <section>
                    <form onSubmit={onSubmitForm}>
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
                        data={state.content}
                        onChange={onChangeEditor}
                        className="editor"
                        />
    
                        {/* 버튼 - 등록 & 취소 */}
                        <div className="buttons">
                            <Button type="default" onClick={onCancel}>취소</Button>
                            <Button type="primary" htmlType="submit">등록</Button>
                        </div>
                    </form>
                </section>    
            </div>
        </div>
      );
    })
};

export default styled(CreateBoard)`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    & {
        .container {
            width: '80%';
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