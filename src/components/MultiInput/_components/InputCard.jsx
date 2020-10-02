import { useObserver, useLocalStore } from "mobx-react";
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import styled from "styled-components";

const InpuCard = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return { edit: false };      
    });

    return (
      <div className={props.className}>
        {state.edit 
          ? (
            <input
              className="edit-input"
              value={props.value} 
              onChange={(e) => props.onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  state.edit = false;
                }
              }}
            />
          )
          : <>
              <span className="value">{props.value}</span>
              <EditOutlined onClick={() => { state.edit = true; }} />
              <CloseOutlined onClick={props.onDelete}/>
          </>
        }
        
      </div>
    );
  });
}

export default styled(InpuCard)`
  & {
    display: flex;
    padding: 0 10px;
    align-items: center;
    background-color: #f6ffed;
    border: 1px solid #b7eb8f;
    color: rgba(0,0,0,.85);

    .edit-input {
      border: 0;
      background: transparent;
    }
    .value { margin-right: 5px; }
    > span[role=img] { margin-left: 5px; }
  }
`;
