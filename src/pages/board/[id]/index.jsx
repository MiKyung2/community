import React from 'react';
import styled, {ServerStyleSheet, injectGlobal} from 'styled-components';
import { Button, Row } from 'antd';
import { EditOutlined, EyeOutlined, CommentOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useObserver, useLocalStore } from 'mobx-react';
import { useRouter } from 'next/router';
import BoardAPI from "../../../api/board";
import CommentList from '../../../components/Board/Comment/CommentList';
import AddComment from '../../../components/Board/Comment/AddComment';


const Board = (props) => {

  console.log("Board props", props)

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
    
    const onClickLikeDislike = () => {
      console.log("clicked like or dislike!")
    }
    

    return (
      <div className={props.className}>
        <div>
          <Row justify="space-between" className="header_top">
            <h2>{state.data.title}</h2>
            <Row>
            <Button type="default" onClick={onClickBackToList}>글 목록</Button>
            </Row>
          </Row>

          <div className="header_bottom">
            <span><strong>작성일:</strong> {state.data.createdDate}</span>
            <span><strong>작성자:</strong> {state.data.writer}</span>
          </div>
          
          
          {/* 게시글 main */}
          <div className="main_container">

            {/* 게시글 상단 */}
            <Row justify="space-between" className="main_container_top">
              
              {/* 해당 게시글 조회수 & 댓글수 & 좋아요수 */}
              <Row>
                <span className="main_container_top_left "><EyeOutlined /> {state.data.viewCount}</span>
                <span className="main_container_top_left "><LikeOutlined onClick={onClickLikeDislike} /> {state.data.rowLike}</span>
                <span className="main_container_top_left "><DislikeOutlined onClick={onClickLikeDislike} /> {state.data.rowDisLike}</span>
                {/* <span className="main_container_top_left "><CommentOutlined /> {state.data.commentCnt}</span> */}
              </Row>

              {/* 수정 & 삭제 */}
              <Row>
                <Button type="text" onClick={onClickEdit}>수정</Button>
                <Button type="text" onClick={onClickDelete}>삭제</Button>
              </Row>
            </Row>


            {/* 게시글 내용 */}
            <div className="main_content ">
              <p>
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

export default styled(Board)`
  & {
    .header_top {
      margin-bottom: 60px;
      > h2 {
        margin-bottom: 40px;
      }
    }
    .header_bottom {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 20px;
      padding: 0 6px;
    }
    .main_container {
      /* border: 1px solid green; */
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
      border-radius: 5px;
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px 10px;
      margin-bottom: 100px;
    }
    .main_container_top {
      /* border: 1px solid red; */
      border-bottom: 1px solid lightgray;
      align-items: center;
      padding-left: 15px;
    }
    .main_container_top_left {
      margin-right: 10px;
      color: gray;
    }
    .main_content {
      /* border: 1px solid red; */
      width: 100%;
      flex: 9;
      margin-top: 50px;
      > p {
        /* border: 1px solid blue; */
        margin: 0;
        padding: 0 30px;
      }
    }
  }
`;
