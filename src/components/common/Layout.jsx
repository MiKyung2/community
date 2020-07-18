import { useRouter } from "next/router";
import styled from "styled-components";

import { Layout, Menu, Badge } from "antd";
const { Content, Header } = Layout;

import dynamic from "next/dynamic";

const LayoutHeader = dynamic({
  loader: import("../../components/common/Header"),
  ssr: false,
});

const Footer = dynamic({
  loader: import("../../components/common/Footer"),
  ssr: false,
});

const LayoutComponent = (props) => {
  return (
    <Layout className={props.className}>
      <Header className="layout-header">
        <LayoutHeader />
      </Header>

      <div className="layout-content">
        <Content className="content">{props.children}</Content>
        <Footer />
      </div>
    </Layout>
  );
};

export default styled(LayoutComponent)`
  & {
    height: 100%;

    .layout-content {
      overflow: auto;

      > .content {
        min-height: calc(100vh - 64px - 62px);
        padding: 30px 50px;
      }
    }
  }
`;
