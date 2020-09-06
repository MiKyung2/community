import { Modal, Form, Input, Button } from "antd";
import { useObserver, useLocalStore } from "mobx-react";
import NoteAPI from "../../api/note";
import { AppContext } from "../App/context";
import { toJS } from "mobx";

const SendNote = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const state = useLocalStore(() => {
      return {
        confirmLoading: false,
        error: "",
        form: [
          { 
            name: "revId", 
            value: props?.receiveUser?.userId || "" 
          },
        ],
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

    // console.log(toJS(props));
    // console.log(toJS(state.form));

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
            <Form.Item name="revId">
              <Input
                style={{
                  borderRadius: 0,
                  borderTop: 0,
                  borderRight: 0,
                  borderLeft: 0,
                }}
                placeholder="받는 사람"
              />
            </Form.Item>

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
