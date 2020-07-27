import "antd/dist/antd.css";
import Head from "next/head";
import Layout from "../components/common/Layout";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import GlobalStyle from "../styles/global";
import { AppContext } from "../components/App/context";
import useApp from "../hooks/app";
import { observerBatching } from "mobx-react-lite";

observerBatching();

function App(props) {
  const app = useApp(props);
  return useObserver(() => {
    return (
      <>
        <GlobalStyle />
        <Head>
          <title>개발자들의 커뮤니티</title>
          <meta
            name="description"
            content="나의 관심 콘텐츠를 가장 즐겁게 볼 수 있는 Daum"
          />
          {/* 카톡, 페이스북 */}
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="site" />
          <meta property="og:description" content="정보 공유 사이트입니다." />
          <meta
            property="og:image"
            content="https://www.daum.net///i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001"
          />

          {/* 트위터 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="site" />
          <meta name="twitter:description" content="정보 공유 사이트입니다." />
          <meta
            name="twitter:image"
            content="https://www.daum.net///i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001"
          />
        </Head>
        <AppContext.Provider value={app}>
          <Layout>
            <props.Component {...props.pageProps} />
          </Layout>
        </AppContext.Provider>
      </>
    );
  });
}

export default styled(App)``;
