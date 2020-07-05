import styled from "styled-components";

import { Row, Col } from 'antd';

const ButtomAction = (props) => {
  return (
    <Col>
      <Row align="middle" justify="center">
        <Col>
          {props.title}
        </Col>
      </Row>
      <Row align="middle" justify="center" >
        <Col>{props.value}</Col>
      </Row>
    </Col>
  );
};

export default styled(ButtomAction)``;