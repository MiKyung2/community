import styled from "styled-components";

import { Row, Col } from "antd";

const ButtomAction = (props) => {
  return (
    <Col onClick={props.onClick}>
      <Row align="middle" justify="center">
        <Col>{props.icon} {props.title}</Col>
      </Row>
      <Row align="middle" justify="center">
        <Col>{props.value}</Col>
      </Row>
    </Col>
  );
};

export default ButtomAction;
