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
  return useObserver(() => {
    const app = useApp(props);
    return (
      <>
        <GlobalStyle />
        <Head>
          <title>개발자들의 커뮤니티</title>
          <meta name="subject" content="" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="author" content="" />
          <meta property="og:title" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="" />
          <meta property="og:image:height" content="" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:url" content="" />
          <meta property="twitter:title" content="" />
          <meta property="twitter:description" content="" />
          <meta property="twitter:image" content="" />
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
