import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Badge } from 'antd';
import { useRouter } from 'next/router';
const { Header, Content, Footer } = Layout;

const route = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Q&A",
    url: "/QnA",
  },
  {
    title: "Tech",
    url: "/tech",
  },
  {
    title: "커뮤니티",
    url: "/community",
  },
  {
    title: "칼럼",
    url: "/columns",
  },
  {
    title: "Job",
    url: "/job",
  },
  {
    title: "게시판",
    url: "/board",
  }, {
    title: "로그인",
    url: "/accounts/login",
  }
];


const LayoutComponent = (props) => {
  const router = useRouter();
  const routerAsPath = router.asPath.split("/");

  return (
    <Layout className={props.className}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          {route.map((i) => <Menu.Item key={i.url} onClick={() => { router.push(i.url) }}>{i.title}</Menu.Item>)}
        </Menu>
        {/* <ul className="menu-alert-icon">
          <li>
            <Badge count={99}>
              <a href="#" className="head-example" />
            </Badge>
          </li>
          <li>
            <Badge count={99}>
              <a href="#" className="head-example" />
            </Badge>
          </li>
          <li>
            <Badge count={99}>
              <a href="#" className="head-example" />
            </Badge>
          </li>
        </ul> */}
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
`;