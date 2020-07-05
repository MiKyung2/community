import 'antd/dist/antd.css';
import Layout from '../components/Layout';
import styled from "styled-components";
import { useObserver } from 'mobx-react';
import GlobalStyle from '../styles/global';
import { AppContext } from '../components/App/context';
import useApp from '../hooks/app';

function App(props) {
  return useObserver(() => {
    const app = useApp(props);
    return (
      <>
        <GlobalStyle />
        <AppContext.Provider value={app}>
          <Layout>
            <props.Component {...props.pageProps} />
          </Layout>
        </AppContext.Provider>

      </>
    );
  });
}

export default styled(App)`
`;
