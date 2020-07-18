import { useRouter } from "next/router";

import { Layout, Menu, Badge, List, Avatar } from "antd";

import { MessageOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

import routes from "../../routes";
import styled from "styled-components";

const LayoutHeader = (props) => {
  const router = useRouter();
  const routerAsPath = router.asPath.split("/");

  const cnt = {
    commentNotReadCnt: 1,
    boardNotReadCnt: 2,
    followNotReadCnt: 3,
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <div className={props.className}>
      <div className="logo" />
      <Menu
        className="main-menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
      >
        {routes.map((i) => (
          <Menu.Item
            key={i.url}
            onClick={() => {
              router.push(i.url);
            }}
          >
            {i.name}
          </Menu.Item>
        ))}
      </Menu>
      <Menu
        className="alert-menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item
          onClick={() => {
            router.push("/notes");
          }}
        >
          <Badge count={cnt.commentNotReadCnt}>
            <a href="#" className="head-example">
              <MessageOutlined />
            </a>
          </Badge>
          {/* <div className="board">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </div> */}
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            router.push("/profile");
          }}
        >
          <Badge count={cnt.boardNotReadCnt}>
            <a href="#" className="head-example">
              <BellOutlined />
            </a>
          </Badge>
          {/* <div className="board"></div> */}
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            router.push("/profile");
          }}
        >
          <Badge count={cnt.followNotReadCnt}>
            <a href="#" className="head-example">
              <UserOutlined />
            </a>
          </Badge>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default styled(LayoutHeader)`
  & {
    display: flex;
    width: 100%;

    .logo {
      flex-shrink: 0;
    }
    .main-menu {
      flex-shrink: 1;
      width: 100%;
    }
    .alert-menu {
      flex-shrink: 0;
    }

    .ant-menu-item {
      position: relative;

      &.ant-menu-item-selected {
        .board {
          display: block;
        }
      }

      .board {
        display: none;
        position: absolute;
        background: yellow;
        border-radius: 8px;
        top: 60px;
        right: 0px;
        width: 360px;
        padding: 10px;
        z-index: 100;
      }
    }

    .ant-list-item {
      overflow: hidden;
    }
  }
`;
