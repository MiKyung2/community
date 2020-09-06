import styled from 'styled-components';
import { List, Card, Table } from 'antd';

export const Title = styled.div`
  font-size: 20px;
  color: #0262b5;
  margin-bottom: 10px;
  span {
    margin-left: 5px;
  }
`;

export const StyledListFirstRow = styled(List)`
  background: #fff;
  overflow: scroll;
  .list-item {
    font-size: 14px;
    color: #0262b5;
    border-left: 2px solid #0262b5;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const StyledListBottomRow = styled(List)`
  background: #fff;
  max-height: 350px;
  overflow: scroll;
  .board-title {
    color: #0262b5;
    font-size: 20px;
    font-weight: 500;
  }
  .list-item {
    font-size: 14px;
    color: #0262b5;
    cursor: pointer;
    :hover {
      border-left: 2px solid #0262b5;
      text-decoration: underline;
    }
  }
`;
export const StyledCard = styled(Card)``;
export const StyledTable = styled(Table)``;
