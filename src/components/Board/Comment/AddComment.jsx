import React from 'react';
import styled from 'styled-components';
// import { Form, Button, List, Input, Avatar, Comment } from 'antd';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
// import {CONFIG} from '../../../utils/CONFIG';
import moment from 'moment';

// const { TextArea } = Input;

const AddComment = () => {

  // style
   const styleTextArea = {
     width: '100%',
     height: '100px',
     borderRadius: '5px'
   }

   const styleAddBtn = {
     borderRadius: '5px',
     backgroundColor: '#1890FF',
     color: '#fff',
     padding: '10px 20px',
     marginTop: '5px'
   }
    
    return useObserver(() => {

        const state = useLocalStore(() => {
            return {
              value: ''
            };
        });

        const onChangeTextArea = (e) => {
          // CONFIG.LOG("on change textarea", e.target.value);
          state.value = e.target.value;
        }

        const onClickAddBtn = () => {
          // CONFIG.LOG("댓글등록 버튼 clicked!", state.value);
          // 댓글 내용 전송!
        }

        return (
          <div style={{marginBottom: '50px'}}>
            <textarea style={styleTextArea} value={state.value} onChange={onChangeTextArea} />
            <button style={styleAddBtn} onClick={onClickAddBtn}>등록</button>
          </div>
        )
    
    });



}

export default AddComment;