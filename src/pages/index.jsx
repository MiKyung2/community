import styled from 'styled-components';
import { Row, Col, Card } from 'antd';
import { useObserver } from 'mobx-react';
import { useRouter } from 'next/router';
import { AppContext } from '../components/App/context';

import Freeboard from '../components/home/Freeboard';
import NoticeBoard from '../components/home/NoticeBoard';
import JobBoard from '../components/home/JobBoard';
import QABoard from '../components/home/QABoard';

import MainAPI from "../api/main";

const Home = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const router = useRouter();

    return (
      <div className={props.className}>
        <div>
          <Row
            className='home-card row'
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col flex='1 1 400px'>
              <Freeboard list={props.resp.free.content || { list: [] }} />
            </Col>
            <Col flex='1 1 400px'>
              <NoticeBoard list={props.resp.notice.content || { list: [] }} />
            </Col>
          </Row>
          <Row
            className='home-card row'
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col flex='1 1 400px'>
              <QABoard list={props.resp.qna.content || { list: [] }} />
            </Col>
            <Col flex='1 1 400px'>
              <JobBoard list={props.resp.jobOffer.content || { list: [] }} />
            </Col>
            {/* <Col flex='1 1 400px'>
              <Card title='Weekly Best' />
            </Col> */}
          </Row>
          <Row
            className='home-card row'
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            {/* 90 */}
            {/* <Col flex='1 1 400px'>
              <Card title='Weekly Best' />
            </Col> */}
          </Row>
        </div>
      </div>
    );
  });
};



Home.getInitialProps = async (ctx) => {

  // 최신순
  let free = await MainAPI.list({
    boardType: "FREE"
  });

  let notice = await MainAPI.list({
    boardType: "NOTICE"
  });

  let qna = await MainAPI.list({
    boardType: "QNA"
  });

  let jobOffer = await MainAPI.list({
    boardType: "JOB_OFFER"
  });

  return {
    resp: {
      free: free.body,
      notice: notice.body,
      qna: qna.body,
      jobOffer: jobOffer.body,
      cate: ctx.query.cate,
    },
  };

}

export default styled(Home)`
  & {
    /* padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    /* main {
      padding: 5rem 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    } */
    .home-card {
      margin-top: 25px;
    }
    .home-card > div {
      margin-top: 20px;
    }
    footer {
      width: 100%;
      height: 100px;
      border-top: 1px solid #eaeaea;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    footer img {
      margin-left: 0.5rem;
    }
    footer a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .title a {
      color: #0070f3;
      text-decoration: none;
    }
    .title a:hover,
    .title a:focus,
    .title a:active {
      text-decoration: underline;
    }
    .title {
      margin: 0;
      line-height: 1.15;
      font-size: 4rem;
    }
    .title,
    .description {
      text-align: center;
    }
    .description {
      line-height: 1.5;
      font-size: 1.5rem;
    }
    code {
      background: #fafafa;
      border-radius: 5px;
      padding: 0.75rem;
      font-size: 1.1rem;
      font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    }
    .grid {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 800px;
      margin-top: 3rem;
    }
    .card {
      margin: 1rem;
      flex-basis: 45%;
      padding: 1.5rem;
      text-align: left;
      color: inherit;
      text-decoration: none;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      transition: color 0.15s ease, border-color 0.15s ease;
    }
    .card:hover,
    .card:focus,
    .card:active {
      color: #0070f3;
      border-color: #0070f3;
    }
    .card h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }
    .card p {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.5;
    }
    .logo {
      height: 1em;
    }
    @media (max-width: 600px) {
      .grid {
        width: 100%;
        flex-direction: column;
      }
    }
  }
`;
