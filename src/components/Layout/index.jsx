import { useRouter } from 'next/router';

import styled from 'styled-components';

import routes from '../../routes';

import { Layout, Menu, Breadcrumb, Badge } from 'antd';
const { Header, Content, Footer } = Layout;

import { MessageOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const LayoutComponent = (props) => {
  const router = useRouter();
  const routerAsPath = router.asPath.split("/");

  const cnt = {
    commentNotReadCnt: 1,
    boardNotReadCnt: 2,
    followNotReadCnt: 3,
  };

  return (
    <Layout className={props.className}>
      <Header className="header">
        <div className="logo" />
        <Menu className="main-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          {routes.map((i) => <Menu.Item key={i.url} onClick={() => { router.push(i.url) }}>{i.name}</Menu.Item>)}
        </Menu>
        <Menu className="alert-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item onClick={() => { router.push("/notes"); }}>
            <Badge count={cnt.commentNotReadCnt}>
              <a href="#" className="head-example" ><MessageOutlined /></a>
            </Badge>
          </Menu.Item>
          <Menu.Item onClick={() => { router.push("/profile"); }}>
            <Badge count={cnt.boardNotReadCnt}>
              <a href="#" className="head-example" ><BellOutlined /></a>
            </Badge>
          </Menu.Item>
          <Menu.Item onClick={() => { router.push("/profile"); }}>
            <Badge count={cnt.followNotReadCnt}>
              <a href="#" className="head-example" ><UserOutlined /></a>
            </Badge>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {routerAsPath.map((d, k) => <Breadcrumb.Item key={k}>{d}</Breadcrumb.Item>)}
        </Breadcrumb>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default styled(LayoutComponent)`
  & {
    .header {
      display: flex;
      
      .logo { flex-shrink: 0;}
      .main-menu { flex-shrink: 1; width: 100%; }
      .alert-menu { flex-shrink: 0; }
    }
  }
`;