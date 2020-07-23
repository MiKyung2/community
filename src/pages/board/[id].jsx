import React, {createElement} from 'react';
import styled from 'styled-components';
import { GetStaticPaths } from 'next';
import { Button, Row } from 'antd';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import CommentList from '../../../components/Board/Comment/CommentList';
import AddComment from '../../../components/Board/Comment/AddComment';
import {dummy} from '../dummy';


const Board = (props) => {

  const router = useRouter();
  const queryId = router.query.id;


  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        
      };
    });

    // 해당 게시판 currentData
    console.log("dummy", dummy);
    const currentData = {...dummy[queryId -1]}


    
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
          <h2 style={{marginBottom: '40px'}}>{currentData.title}</h2>
          <Button type="default" onClick={onClickBackToList}>글 목록</Button>
        </Row>


        <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '15px',
                marginBottom: '20px',
                padding: '0 6px'
        }}>
          <span><strong>작성일:</strong> 2020-07-07</span>
          <span><strong>작성자:</strong> {currentData.writer}</span>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Cum ad odio suscipit et. Animi, veniam est, blanditiis ducimus 
            laboriosam iusto nulla fuga quidem soluta voluptatum repellat ad. 
            Ducimus, ipsam numquam!<br/><br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Itaque sint reprehenderit molestiae in assumenda dolores odio deserunt 
            fugit! Dolore magnam fugit molestiae nihil ea, 
            deleniti alias impedit quisquam consequuntur quidem?<br/><br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Itaque sint reprehenderit molestiae in assumenda dolores odio deserunt 
            fugit! Dolore magnam fugit molestiae nihil ea, 
            deleniti alias impedit quisquam consequuntur quidem?<br/><br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Itaque sint reprehenderit molestiae in assumenda dolores odio deserunt 
            fugit! Dolore magnam fugit molestiae nihil ea, 
            deleniti alias impedit quisquam consequuntur quidem?
            </p>`
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

// Board.getInitialProps = async () => {

//   // 여기에서 "queryId"에 맞는 정보 api fetch 해오기
//   // async - await

//   const currentData = await dummy[queryId -1];
  
//   return currentData

// }

export default Board;
