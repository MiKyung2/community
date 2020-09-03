import React from 'react';
import { Row, Col, Card } from 'antd';
import UserAPI from '../../api/user';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import ProfileEdit from '../../components/profile/edit/ProfileEdit';
import SnsCard from '../../components/profile/edit/SNSConectCard';
import PassAndDeleteUser from '../../components/profile/edit/PassAndDeleteUser';

const EditProfile = ({ profile, id }) => {
  return (
    <div style={{ marginTop: 35 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col flex='1 1 400px'>
          <ProfileEdit id={id} profile={profile} />
        </Col>
        <Col flex='1 1 400px'>
          <SnsCard />
          <PassAndDeleteUser id={id} />
        </Col>
      </Row>
    </div>
  );
};

EditProfile.getInitialProps = async (ctx) => {
  const ck = cookie.parse(
    (ctx.req ? ctx.req.headers.cookie : document.cookie) ?? '',
  );
  const id = ck.id ?? '';
  const profileRes = await UserAPI.get({ id });

  // const token = ck.token ?? '';
  // const decodedToken = jwt.decode(token.replace('Bearer ', ''));
  // const userId = decodedToken?.userId ?? '';

  return {
    profile: profileRes.body,
    id,
  };
};

export default EditProfile;
