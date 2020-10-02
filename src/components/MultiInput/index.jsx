import styled from "styled-components";

import { useObserver, useLocalStore } from "mobx-react";
import InputCard from "./_components/InputCard";
import { PlusCircleOutlined } from "@ant-design/icons";

const MultiInput = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return { 
        input: "",
        revIdArray: [],
      }
    });

    return (
      <div className={props.className}>
        {state.revIdArray.map((value, idx) => (
          <InputCard
            value={value} 
            onChange={(value) => { 
              state.revIdArray.splice(idx, 1, value); 
            }} 
            onDelete={() => { 
              state.revIdArray.splice(idx, 1);
            }}
          />
        ))}
        <input 
            className="input"
            value={state.input} 
            onChange={(e) => {
              state.input = e.target.value; 
            }}
            onKeyDown={(e) => {
              /** 32 스페이스, 13 엔터, 8 백스페이스 */
              if (e.key === " " || e.key === "Enter") {
                
                state.revIdArray.push(state.input);
                state.input = "";
              }

              if (e.key === "Backspace" && state.input === "") {
                state.revIdArray.pop();
              }
            }}
          />
      </div>
    );
  });
};

export default styled(MultiInput)`
  & {
    display: flex;
    flex-wrap: wrap;
    border-radius: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: 1px solid #d9d9d9;

    > div {
      margin: 0 4px 3px 0;
    }

    .input { border: 0; }
  }
`;
