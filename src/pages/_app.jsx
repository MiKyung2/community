import 'antd/dist/antd.css';
import 'react-virtualized/styles.css';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import GlobalStyle from '../styles/global';
import { AppContext } from '../components/App/context';
import useApp from '../hooks/app';
import { observerBatching } from 'mobx-react-lite';
import { CookiesProvider, Cookies } from 'react-cookie';
import NextApp, { AppContext as NextAppContext } from 'next/app';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import CONFIG from "../utils/CONFIG";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useRouter } from 'next/router';

observerBatching();

let sockJS = new SockJS(`https://toyproject.okky.kro.kr:8443/ws-stomp`);
let stompClient = Stomp.over(sockJS);

function App(props) {
  return useObserver(() => {
    const global = useApp(props);
    const router = useRouter();

    React.useEffect(() => {
      if (global.state.user.userId) {
        stompClient.connect({},()=>{
          stompClient.subscribe('/socket/sub/note/' + global.state.user.userId, (data) => {
            global.state.alarm.note = true;
          });

          stompClient.subscribe('/socket/sub/board/' + global.state.user.userId, (event) => {
            global.state.alarm.board = true;
          });

          stompClient.subscribe('/socket/sub/profile/' + global.state.user.userId, (event) => {
            global.state.alarm.profile = true;
          });
        });
      }
      
      if (!(global.state.user.userId) && router.pathname === "/notes") {
        router.replace("/accounts/signin");
      }
    }, [global.state.user.userId]);

    return (
      <>
        <GlobalStyle />
        <Head>
          <title>개발자들의 커뮤니티</title>
          <meta
            name='description'
            content='나의 관심 콘텐츠를 가장 즐겁게 볼 수 있는 Daum'
          />
          {/* 카톡, 페이스북 */}
          <meta property='og:url' content='' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='site' />
          <meta property='og:description' content='정보 공유 사이트입니다.' />
          <meta
            property='og:image'
            content='https://www.daum.net///i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001'
          />

          {/* 트위터 */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='site' />
          <meta name='twitter:description' content='정보 공유 사이트입니다.' />
          <meta
            name='twitter:image'
            content='https://www.daum.net///i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001'
          />
        </Head>
        <AppContext.Provider value={global}>
          <CookiesProvider>
            <Layout>
              <props.Component {...props.pageProps} />
            </Layout>
          </CookiesProvider>
        </AppContext.Provider>
      </>
    );
  });
}

App.getInitialProps = async (appContext) => {
  const nextAppProps = await NextApp.getInitialProps(appContext);
  const ctx = appContext.ctx;

  const ssr = !!appContext.ctx.req;
  const ck = cookie.parse(
    (ctx.req ? ctx.req.headers.cookie : document.cookie) ?? '',
  );

  const token = ck.token ?? '';
  const decodedToken = jwt.decode(token.replace('Bearer ', ''));
  const userId = decodedToken?.userId ?? '';
  const role = decodedToken?.Role ?? "";

  return {
    ...nextAppProps,
    ssr,
    cookie,
    init: {
      user: {
        role,
        token,
        userId,
      },
    },
  };
};

export default styled(App)``;
