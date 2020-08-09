import { useRouter } from "next/router";

import { Layout, Menu, Badge, List, Avatar, Popover, Button } from "antd";
const { Header } = Layout;

import { MessageOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

import routes from "../../routes";
import styled from "styled-components";

import { useObserver } from "mobx-react";

const LayoutHeader = (props) => {
  return useObserver(() => {
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
      <Header className={props.className}>
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
        <div className="alert-menu">
          <Popover
            placement="bottomRight"
            content={<div>content</div>}
            trigger="click"
          >
            <Button
              onClick={() => {
                router.push("/notes");
              }}
            >
              <Badge count={cnt.commentNotReadCnt}>
                <a href="#" className="head-example">
                  <MessageOutlined />
                </a>
              </Badge>
            </Button>
          </Popover>
          <Button>
            <Badge count={cnt.boardNotReadCnt}>
              <a href="#" className="head-example">
                <BellOutlined />
              </a>
            </Badge>
          </Button>
          <Button
            onClick={() => {
              router.push("/profile");
            }}
          >
            <Badge count={cnt.followNotReadCnt}>
              <a href="#" className="head-example">
                <UserOutlined />
              </a>
            </Badge>
          </Button>
        </div>
      </Header>
    );
  });
};

export default styled(LayoutHeader)`
  & {
    display: flex;

    .logo {
      flex-shrink: 0;
    }
    .main-menu {
      flex-shrink: 1;
      width: 100%;
    }
    .alert-menu {
      flex-shrink: 0;
      li {
        border-radius: 50%;
      }
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
        padding: 10px;
        z-index: 100;
      }
    }
  }
`;
