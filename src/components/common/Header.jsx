import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useObserver, useLocalStore } from 'mobx-react';
import { useCookies, cookies } from 'react-cookie';
import { Layout, Menu, Badge, List, Avatar, Popover, Button } from 'antd';
const { Header } = Layout;
import ProfileTabList from '../profile/ProfileList';
import { MessageOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import useApp from '../../hooks/app';
import routes from '../../routes';
import styled from 'styled-components';
import { AppContext } from '../App/context';
import { toJS } from 'mobx';

import AuthAPI from '../../api/auth';
import Modal_login from '../Board/Modals/Modal_login';

const theLatestDate = [
  {
    key: 1,
    boardId: 1,
    title: '게시물에 댓글을 남겼습니다.',
    description: '[모집중] 토이프로젝트 모집합니다.',
    time: '2분 전',
    user: {
      id: 1,
      nickname: '김코딩',
    },
  },
  {
    key: 2,
    boardId: 2,
    title: '게시물에 댓글을 남겼습니다.',
    description: '[모집중] 토이프로젝트 모집합니다.',
    time: '2분 전',
    user: {
      id: 1,
      nickname: '김코딩',
    },
  },
  {
    key: 3,
    boardId: 3,
    title: '게시물에 댓글을 남겼습니다.',
    description: '[모집중] 토이프로젝트 모집합니다.',
    time: '2분 전',
    user: {
      id: 1,
      nickname: '김코딩',
    },
  },
];

const LayoutHeader = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const [cookies, _, removeCookie] = useCookies(['token']);
    const router = useRouter();

    const state = useLocalStore(() => {
      return {
        modal: {
          login: false
        },
      };
    });

    const cnt = {
      commentNotReadCnt: true,
      boardNotReadCnt: true,
      followNotReadCnt: false,
    };

    const handleClickLogin = () => {
      router.push('/accounts/signin');
    };

    const handleClickLogout = async () => {
      router.push('/accounts/signin');
      removeCookie('token');
      await global.action.logout();
    };

    // 모달창 handle
    const handleCancel = () => {
      state.modal.login = false;
    }

    const handleOk = () => {
      router.push('/accounts/signin');
      state.modal.login = false;
    }

    const handleClickMenu = (i) => {
      if(!global.state.user.token && i.role === 'Y'){
        state.modal.login = true;
      } else {
        router.push(i.url, i.as); 
      }
    }

    return (
      <Header className={props.className}>

        {/* 로그인 모달 */}
        <Modal_login 
          isLogin={state.modal.login} 
          handleOk={handleOk} 
          handleCancel={handleCancel} 
        />

        <div className='logo' />
        <Menu
          className='main-menu'
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={[router.asPath]}
        >
          {routes.map((i) => (
            global.state.user.role === 'A' ?
            <Menu.Item
              key={i.as}
              onClick={() => 
                router.push(i.url, i.as)
              }
            >
              {i.name}
            </Menu.Item>
            :
            i.role === 'A' ? null :
            <Menu.Item
              key={i.as}
              onClick={() => handleClickMenu(i)}
            >
              {i.name}
            </Menu.Item>
          ))}

          {global?.state?.user?.token ? (
            <Menu.Item onClick={handleClickLogout}>로그아웃</Menu.Item>
          ) : (
            <Menu.Item onClick={handleClickLogin}>로그인</Menu.Item>
          )}
        </Menu>

        {global?.state?.user?.token ? (
          <div className='alert-menu'>
            <Button
              onClick={() => {
                router.push('/notes');
              }}
            >
              <Badge count={global.state.alarm.note ? 'N' : ''}>
                <MessageOutlined />
              </Badge>
            </Button>
            <Popover
              placement='bottomRight'
              content={
                <ProfileTabList loading={false} dataSource={theLatestDate} />
              }
              trigger='click'
            >
              <Button>
                <Badge
                  count={
                    global.state.alarm.board || global.state.alarm.profile
                      ? 'N'
                      : ''
                  }
                >
                  <BellOutlined />
                </Badge>
              </Button>
            </Popover>
            <Button
              onClick={() => {
                router.push(
                  '/profile/[userId]',
                  `/profile/${global.state.user.userId}`,
                );
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
