import React from 'react';
import styled from 'styled-components';
import { Select, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CKEditor from 'ckeditor4-react';
// import {CONFIG} from '../../utils/CONFIG';

// const { Option } = Select;
// const options = [
//     {
//         value: 'default',
//         text: '게시판을 선택해주세요.'
//     },
//     {
//         value: 'option1',
//         text: 'Option1'
//     },
//     {
//         value: 'option2',
//         text: 'Option2'
//     },
//     {
//         value: 'option3',
//         text: 'Option3'
//     }
// ];

const WriteBoardForm = (props) => {

    const { boardType, boardTitle, boardContents, submitBtn } = props;
    const { onSubmitForm, onCancel, onChangeSelect, onChangeTitle, onChangeEditor } = props;

 
      return (
        <div className={props.className}>
            <div className="container">
                <header className="header">
					<h2>{boardType}</h2>
					{/* <Avatar size="large" icon={<UserOutlined />} /> */}
                </header>
    
                <section>
                    <form onSubmit={onSubmitForm}>
                        {/* 게시판 선택 */}
                        {/* <Select defaultValue="default" className="select" onChange={onChangeSelect}>
                            {options && options.map((option, index) => (
                                <Option key={index} value={option.value}>{option.text}</Option>
                            ))}
                        </Select> */}
                        
                        {/* 게시판 제목 */}
                        <Input 
                            value={boardTitle} 
                            onChange={onChangeTitle} 
                            className="input" 
                            placeholder="제목을 입력해주세요." 
                            maxLength="255"
                        />
                        
                        {/* 게시판 내용 */}
                        <CKEditor
                            type="classic"
                            data={boardContents}
                            onChange={onChangeEditor}
                        />
    
                        {/* 버튼 - 등록||수정 & 취소 */}
                        <div className="buttons">
                            <Button type="default" onClick={onCancel}>취소</Button>
                            <Button type="primary" htmlType="submit">{submitBtn}</Button>
                        </div>
                    </form>
                </section>    
            </div>
        </div>
      );
};

export default styled(WriteBoardForm)`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    & {
        .container {
            /* border: 1px solid red; */
            width: 80%;
        }
        .header {
            /* border: 1px solid red; */
            /* display: flex;
            justify-content: space-between; 
            align-items: center; */
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
        .buttons {
            display: flex; 
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
        }
    }
`;