import React from 'react';
import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

import ProfileTabList from "../../components/Profile/List";
import ProfileCard from "../../components/Profile/Card";

const ProfilePage = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return { loading: false };
    });

    return (
      <div className={props.className}>
        {/* 프로필 상세 */}
        <ProfileCard loading={state.loading} />

        {/* 게시물 탭 */}
        <Tabs
          large
          type="card"
          defaultActiveKey="1"
          onChange={(key) => { console.log("key : ", key); }}
        >
          <TabPane tab="최근 활동" key="1">
            <ProfileTabList loading={false} dataSource={[{ title: "게시물에 댓글을 남겼습니다.", description: "[모집중] 토이프로젝트 모집합니다.", time: "2분 전", writer: "김코딩" }]} />
          </TabPane>
          <TabPane tab="게시물" key="2">
            <ProfileTabList loading={false} dataSource={[{ title: "게시물에 댓글을 남겼습니다.", description: "[모집중] 토이프로젝트 모집합니다.", time: "2분 전", writer: "김코딩" }]} />
          </TabPane>
          <TabPane tab="스크랩" key="3">
            <ProfileTabList loading={false} dataSource={[{ title: "게시물에 댓글을 남겼습니다.", description: "[모집중] 토이프로젝트 모집합니다.", time: "2분 전", writer: "김코딩" }]} />
          </TabPane>
        </Tabs>
      </div>
    );
  });
};

export const getStaticProps = async () => {
  return {
    props: {}
  };
}

export default styled(ProfilePage)`
  & {
    
  }
`;
