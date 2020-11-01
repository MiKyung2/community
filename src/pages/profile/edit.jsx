import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

import ProfileEdit from '../../components/profile/edit/ProfileEdit';
import SnsCard from '../../components/profile/edit/SNSConectCard';
import PassAndDeleteUser from '../../components/profile/edit/PassAndDeleteUser';

import UserAPI from '../../api/user';

const EditProfile = () => {
  const [profile, setProfileT] = useState(null);
  const [cookies] = useCookies(['access_token', 'refresh_token']);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) {
        const token = cookies.access_token;
        const { userId } = jwt.decode(token);

        const response = await UserAPI.get({ userId });
        setProfileT(response.body);
      }
    };

    fetchData();
  }, [profile]);

  return (
    <div style={{ marginTop: 35 }}>
      <Row gutter={{
        xs: 8, sm: 16, md: 24, lg: 32,
      }}>
        <Col flex="1 1 400px">
          <ProfileEdit id={profile?.userId} profile={profile} />
        </Col>
        <Col flex="1 1 400px">
          <SnsCard />
          <PassAndDeleteUser id={profile?.userId} />
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
