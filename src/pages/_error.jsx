import * as React from "react";
import styled from "styled-components";

class ErrorPage extends React.Component {
  timeoutId = NaN;

  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  componentWillUnmount() {
    if (isNaN(this.timeoutId)) return;
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div className={this.props.className}>
        <p>ERROR</p>
      </div>
    );
  }
}

export default styled(ErrorPage)`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 100px;
    font-weight: bold;
  }
`;
