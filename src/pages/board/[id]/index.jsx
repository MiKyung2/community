import React from 'react';
import styled from 'styled-components';
import { Button, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import BoardAPI from "../../../api/board";
import CommentList from '../../../components/Board/Comment/CommentList';
import AddComment from '../../../components/Board/Comment/AddComment';


const Board = (props) => {

  const router = useRouter();
  const queryId = router.query.id;

  // console.log("게시물 props", props.props.board.body)

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        data: props.props.board.body
      };
    });

    
    const onClickBackToList = () => {
      console.log("글목록으로 돌아가기");
      router.push('/board');
    }

    const onClickEdit = () => {
      console.log("글 수정 페이지로 이동!");
      router.push(`/board/${queryId}/modify`);
    }

    const onClickDelete = async() => {
      console.log("글 삭제!");
      console.log("해당 게시글 id", queryId);

      const boardDeleteRes = await BoardAPI.delete({ 
        id: queryId
      });

      console.log("글 삭제 후 res", boardDeleteRes);

      router.push('/board');
    }

    

    return (
      <div style={{
                // border: '1px solid black',
                // maxWidth: '75%',
      }}>
        <Row justify="space-between" style={{ marginBottom: '60px'}}>
          <h2 style={{marginBottom: '40px'}}>{state.data.title}</h2>
          <Row>
          <Button type="default" onClick={onClickBackToList}>글 목록</Button>
          </Row>
        </Row>


        <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '13px',
                marginBottom: '20px',
                padding: '0 6px'
        }}>
          <span><strong>작성일:</strong> {state.data.createdDate}</span>
          <span><strong>작성자:</strong> {state.data.writer}</span>
        </div>
        
        {/* 게시판 main */}
        <div style={{
                // border: '1px solid green',
                backgroundColor: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)', 
                borderRadius: '5px',
                height: '250px',
                // maxWidth: '75%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px 10px',
                marginBottom: '100px',
                // overflow: 'auto'
        }}>

        {/* 수정 & 삭제 */}
        <Row justify="end" style={{flex: '1'}}>
          <Button type="text" onClick={onClickEdit}>수정</Button>
          <Button type="text" onClick={onClickDelete}>삭제</Button>
        </Row>

          {/* 내용 */}
          <div style={{
                  // border: '1px solid red',
                  width: '100%',
                  flex: '9' 
          }}>
            <p style={{
                // border: '1px solid blue',
                margin: '0',
                padding: '0 30px'
              }}>
                {state.data.contents}
            </p>
          </div>
        </div>


        {/* 댓글 */}
        <div>
          <h3>댓글</h3>

          {/* 댓글 - 리스트 */}
          <CommentList />

          {/* 댓글 - 새댓글 등록 */}
          <AddComment />
        </div>



        {/* 글목록 버튼*/}

      </div>
    );
  });
};



Board.getInitialProps = async({ query }) => {

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


export default Board;
