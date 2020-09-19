import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import CKEditor from 'ckeditor4-react';


const WriteBoardForm = (props) => {

    const { boardName, boardType, boardTitle, boardContents, submitBtn } = props;
    const { onSubmitForm, onCancel, onChangeTitle, onChangeEditor } = props;
 
      return (
        <div className={props.className}>
            <div className="container">
                <header className="header">
					<h2>{boardType}</h2>
                </header>
    
                <section>
                    <h3 className="board-name">[{boardName}]</h3>
                    <form onSubmit={onSubmitForm}>
                        
                        {/* 게시판 제목 */}
                        <Input 
                            value={boardTitle} 
                            onChange={onChangeTitle} 
                            className="input" 
                            placeholder="제목을 입력해주세요." 
                            maxLength="50"
                        />
                        
                        {/* 게시판 내용 */}
                        <CKEditor
                            type="classic"
                            data={boardContents}
                            onChange={onChangeEditor}
                            config={{
                                extraPlugins: 'easyimage',
                                removePlugins: 'image',
                                cloudServices_tokenUrl: 'https://74862.cke-cs.com/token/dev/bcd15493d7b31dc608b2c38d3170023373fce3089371bf94004c0b882701',
                                cloudServices_uploadUrl: 'https://74862.cke-cs.com/easyimage/upload/'
                            }}
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
        .board-name {
            /* border: 1px solid red; */
            margin-bottom: 15px;
            font-size: 15px;
            color: gray;
            text-align: end;
        }
        .header {
            /* border: 1px solid red; */
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