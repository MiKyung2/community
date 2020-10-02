import { Modal, Form, Input, Button } from "antd";
import { useObserver, useLocalStore } from "mobx-react";
import NoteAPI from "../../api/note";
import { AppContext } from "../App/context";
import { toJS } from "mobx";
import MultiInput from "../MultiInput/index";
import { PlusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const SendNote = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const state = useLocalStore(() => {
      return {
        confirmLoading: false,
        error: "",
        revId: "",
        form: [
          { 
            name: "revId", 
            value: props?.receiveUser?.userId || "" 
          },
        ],
        follow: {
          list: false,
        }
      };
    });

    const handleOk = () => {
      state.confirmLoading = true;
      const result = { sendId: global.state.user.userId };
      state.form.map((d) => {
        result[d.name[0]] = d.value;
      });

      onFinish(result);
    };

    const handleCancel = () => {
      state.form = state.form.map((i) => i.value = "");
    };

    const onFinish = (form) => {
      (async () => {
        try {
          const res = await NoteAPI.post({
            data: form,
          });
          props.onFinish();
        } catch (error) {
          state.error = true;
        } finally {
          state.confirmLoading = false;
          props.onCancel();
        }
      })();
    };

    return (
      <div className={props.className}>
        <Modal
          style={{
            position: "absolute",
            top: "initial",
            right: "50px",
            bottom: "0",
            paddingBottom: "0px",
          }}
          maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          title="쪽지 보내기"
          visible={props.visible}
          onOk={handleOk}
          confirmLoading={state.confirmLoading}
          onCancel={() => {
            props.onCancel();
            handleCancel();
          }}
          footer={[
            <Button key="cancel" onClick={() => {
              props.onCancel();
              handleCancel();
            }}>
              취소
            </Button>,
            <Button
              key="send"
              type="primary"
              loading={state.confirmLoading}
              onClick={handleOk}
            >
              보내기
            </Button>,
          ]}
        >
          <Form 
            layout="horizontal" 
            fields={state.form} 
            onFieldsChange={(changedFields, allFields) => {
              state.form = allFields;
            }}
          >
            <div className="rev-wrap" style={{ position: "relative" }}>
              {state.follow.list ? <div style={{ position: "absolute", left: "-92px", top: "0", background: "#fff", padding: "10px" }}>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  <li style={{ cursor: "pointer" }} onClick={() => { state.follow.list = false; }}>리스트</li>
                  <li>리스트</li>
                  <li>리스트</li>
                  <li>리스트</li>
                </ul>
              </div> : null}
              <PlusCircleOutlined style={{ position: "absolute", left: "-15px", top: "4px", fontSize: "11px" }} onClick={() => { state.follow.list = !state.follow.list; }} />
              <MultiInput onClick={() => { state.follow.list = !state.follow.list; }} />
            </div>
            
            <Form.Item name="title">
              <Input
                style={{
                  borderRadius: 0,
                  borderTop: 0,
                  borderRight: 0,
                  borderLeft: 0,
                }}
                placeholder="제목"
              />
            </Form.Item>
            <Form.Item name="contents">
              <Input.TextArea
                name="content"
                style={{
                  borderRadius: 0,
                  borderTop: 0,
                  borderRight: 0,
                  borderLeft: 0,
                }}
                autoSize={{ minRows: 10, maxRows: 10 }}
                placeholder="내용"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  });
};

export default SendNote;
