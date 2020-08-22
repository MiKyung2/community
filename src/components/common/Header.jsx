import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { Layout, Menu, Badge, List, Avatar, Popover, Button } from 'antd';
const { Header } = Layout;
import ProfileTabList from "../profile/ProfileList";
import { MessageOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import useApp from '../../hooks/app';
import routes from '../../routes';
import styled from 'styled-components';
import { AppContext } from '../App/context';

const theLatestDate = [
  {
    key: 1,
    boardId: 1,
    title: "게시물에 댓글을 남겼습니다.",
    description: "[모집중] 토이프로젝트 모집합니다.",
    time: "2분 전",
    user: {
      id: 1,
      nickname: "김코딩",
    }
  },
  {
    key: 2,
    boardId: 2,
    title: "게시물에 댓글을 남겼습니다.",
    description: "[모집중] 토이프로젝트 모집합니다.",
    time: "2분 전",
    user: {
      id: 1,
      nickname: "김코딩",
    }
  },
  {
    key: 3,
    boardId: 3,
    title: "게시물에 댓글을 남겼습니다.",
    description: "[모집중] 토이프로젝트 모집합니다.",
    time: "2분 전",
    user: {
      id: 1,
      nickname: "김코딩",
    }
  },
];

const LayoutHeader = (props) => {
  const global = React.useContext(AppContext);
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        login: false,
      };
    });
    const [cookies, _, removeCookie] = useCookies(['token', 'id']);
    const router = useRouter();

    const cnt = {
      commentNotReadCnt: 1,
      boardNotReadCnt: 2,
      followNotReadCnt: 3,
    };

    useEffect(() => {
      if (cookies.token) {
        state.login = true;
      }
      if (!cookies.token) {
        state.login = false;
      }
    }, [cookies.token]);

    const removeCookies = () => {
      removeCookie('token');
      removeCookie('id');
      router.reload();
    };

    return (
      <Header className={props.className}>
        <div className='logo' />
        <Menu
          className='main-menu'
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
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
          {state.login ? (
            <Menu.Item onClick={removeCookies}>로그아웃</Menu.Item>
          ) : (
            <Menu.Item
              onClick={() => {
                router.push('/accounts/signin');
              }}
            >
              로그인
            </Menu.Item>
          )}
        </Menu>
        {state.login ? (
          <div className='alert-menu'>
            <Button
              onClick={() => {
                router.push('/notes');
              }}
            >
              <Badge count={cnt.commentNotReadCnt}>
                <MessageOutlined />
              </Badge>
            </Button>
            <Popover
              placement='bottomRight'
              content={<ProfileTabList loading={false} dataSource={theLatestDate} />}
              trigger='click'
            >
              <Button>
                <Badge count={cnt.boardNotReadCnt}>
                  <BellOutlined />
                </Badge>
              </Button>
            </Popover>
            <Button
              onClick={() => {
                router.push(`/profile/${global.state.user.id}`);
              }}
            >
              <UserOutlined />
            </Button>
          </div>
        ) : null}
        
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
