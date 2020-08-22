import React from "react";
import styled from "styled-components";
import { useObserver, useLocalStore } from "mobx-react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

import ProfileTabList from "../../../components/profile/ProfileList";
import ProfileCard from "../../../components/profile/ProfileCard";
import SendNote from "../../../components/note/SendNote";
import UserAPI from "../../../api/user";
import { AppContext } from '../../../components/App/context';
import { useRouter } from "next/router";

const ProfilePage = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const router = useRouter();
    const state = useLocalStore(() => {
      return {
        loading: false,
        tabActive: "1",
        send: {
          open: false,
          receiveUser: {
            id: 0,
            user: "",
          },
        },
        profile: props.profile,
      };
    });

    React.useEffect(() => {
      if (global.state.srr) return;

      getProfile();
    }, []);

    const getProfile = () => {
      (async () => {
        const profileRes = await UserAPI.get({ id: router.query.id });
        state.profile = profileRes.body;
      })();
    };

    return (
      <div className={props.className}>
        {/* 프로필 상세 */}
        <ProfileCard
          loading={state.loading}
          data={state.profile}
          onOpenNote={() => {
            state.send.open = true;
          }}
          onUpdate={() => {
            getProfile();
          }}
        />

        {/* 게시물 탭 */}
        <Tabs large="true" type="card" defaultActiveKey="1">
          <TabPane tab="최근 활동" key="1">
            <ProfileTabList loading={false} dataSource={props.theLatestDate} />
          </TabPane>
          <TabPane tab="게시물" key="2">
            <ProfileTabList loading={false} dataSource={props.theLatestDate} />
          </TabPane>
          <TabPane tab="스크랩" key="3">
            <ProfileTabList loading={false} dataSource={props.theLatestDate} />
          </TabPane>
        </Tabs>
        <SendNote
          receiveUser={{
            id: state.profile.id,
            userId: state.profile.userId,
          }}
          visible={state.send.open}
          onCancel={() => {
            state.send.open = false;
          }}
        />
      </div>
    );
  });
};

ProfilePage.getInitialProps = async (ctx) => {
  const profileRes = await UserAPI.get({ id: ctx.query.id });

  return {
    profile: profileRes.body,
    theLatestDate: [
      {
        key: 1,
        title: "게시물에 댓글을 남겼습니다.",
        description: "[모집중] 토이프로젝트 모집합니다.",
        time: "2분 전",
        writer: "김코딩",
      },
      {
        key: 2,
        title: "게시물에 댓글을 남겼습니다.",
        description: "[모집중] 토이프로젝트 모집합니다.",
        time: "2분 전",
        writer: "김코딩",
      },
      {
        key: 3,
        title: "게시물에 댓글을 남겼습니다.",
        description: "[모집중] 토이프로젝트 모집합니다.",
        time: "2분 전",
        writer: "김코딩",
      },
    ],
  };
};

export default styled(ProfilePage)`
  & {
  }
`;
