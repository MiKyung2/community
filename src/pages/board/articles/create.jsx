import React from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { Select, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CKEditor from 'ckeditor4-react';
import {useRouter} from 'next/router';
import Axios from 'axios';

const { Option } = Select;
const CreateBoard = () => {
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
           
            // 1) 등록 api 요청
            // 2) 글 목록 or 해당 글로 이동
            // Q. 어떻게 각각의 요소들의 value를 가져오면 좋을까? -ok..?

            const formData = {
                // id: 1,
                writer: "ally",
                // select: state.select,
                title: state.title,
                contents: state.content,
            }

			console.log('폼 제출', formData);
			
			Axios.post('http://141.164.41.213:8081/v1/api/board/write', formData, function(isSuccess, result) {
				console.log(result);
			})



            // 글목록 or 해당 글로 이동
            // router.push('/board', `/board`);
        }
    
        const onChangeSelect = (e) => {
            console.log("게시판 선택", e);
            state.select = e;
        }

        const onChangeTitle = (e) => {
            console.log("title!!!", e.target.value);
            state.title = e.target.value;
        }

        const onChangeEditor = (e) => {
            // input data 변경 
            console.log("onEditorChange!", e.editor.getData());
            state.content = e.editor.getData();
        }
    
        const onCancel = (e) => {
            console.log("새 글 작성 - 취소");
            // 글목록 or 해당 글로 이동
            router.push('/board', `/board`);
        }				      
    
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="container" style={{ width: '80%'}}>
                <header style={{
					// border: '1px solid red', 
					display: 'flex', 
					justifyContent: 'space-between', 
					alignItems: 'center',
					marginBottom: '40px'
					}}
                >
					<h2>새 글 작성</h2>
					<Avatar size="large" icon={<UserOutlined />} />
                </header>
    
                <section>
                    <form onSubmit={onSubmitForm}>
                        {/* 게시판 선택 */}
                        <Select defaultValue="default" style={{ width: '100%', marginBottom: '15px' }} onChange={onChangeSelect}>
                            <Option value="default">게시판을 선택해주세요.</Option>
                            <Option value="option1">Option1</Option>
                            <Option value="option2">Option2</Option>
                            <Option value="option3">Option3</Option>
                        </Select>
                        
                        {/* 게시판 제목 */}
                        <Input value={state.title} onChange={onChangeTitle} style={{ width: '100%', marginBottom: '15px' }} placeholder="제목을 입력해주세요." />
                        
                        {/* 게시판 내용 */}
                        <CKEditor
                        data={state.content}
                        onChange={onChangeEditor}
                        style={{marginBottom: '30px'}}
                        />
    
                        {/* 버튼 - 등록 & 취소 */}
                        <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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

`;