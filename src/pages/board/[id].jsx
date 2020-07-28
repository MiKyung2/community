import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { GetStaticPaths } from 'next';
import { Button, Row } from 'antd';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import BoardAPI from "../../api/board";
import CommentList from '../../components/Board/Comment/CommentList';
import AddComment from '../../components/Board/Comment/AddComment';


const Board = (props) => {

  console.log("props ctx", props)

  // const router = useRouter();
  // Board.getInitialProps(router.query.id);

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        // data: props.board.content
      };
    });

    // 해당 게시판 currentData

    
    const onClickBackToList = () => {
      console.log("글목록으로 돌아가기");
      router.push('/board');
    }

    
  
    return (
      <div style={{
                // border: '1px solid black',
                // maxWidth: '75%',
      }}>
        <Row justify="space-between" style={{marginBottom: '30px'}}>
          {/* <h2 style={{marginBottom: '40px'}}>{currentData.title}</h2> */}
          <Button type="default" onClick={onClickBackToList}>글 목록</Button>
        </Row>


        <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '15px',
                marginBottom: '20px',
                padding: '0 6px'
        }}>
          {/* <span><strong>작성일:</strong> {currentData.createdDate}</span> */}
          {/* <span><strong>작성자:</strong> {currentData.writer}</span> */}
        </div>
        
        {/* 게시판 내용 */}
        <div style={{
                // border: '1px solid green',
                backgroundColor: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)', 
                // height: '250px',
                // maxWidth: '75%',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px 10px',
                marginBottom: '40px',
                // overflow: 'auto'
        }}>
          <div style={{
                  // border: '1px solid red',
                  width: '85%' 
          }}>
            <p style={{
                // border: '1px solid blue',
                marginTop: '20px',
              }}>
                {/* {currentData.contents} */}
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


// export async function getStaticPaths() {
//   return {
//     paths: 
//       `/board/8`,
//     fallback: true,
//   }
// }


// export const getStaticProps = async (ctx) => {

//   console.log("ctx - 찾아라queryId", ctx);

//   // const boardDetailRes = await BoardAPI.detail({ 
//   //   id: ctx.query
//   //  });

//   //  console.log("boardDetailRes", boardDetailRes)
//   return {
//     // props: {
//     //   board: boardDetailRes,
//     // },
//     ctx: ctx
//   };

// }


export default Board;
