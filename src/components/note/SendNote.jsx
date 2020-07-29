import { Modal, Form, Input, Button } from "antd";
import { useObserver, useLocalStore } from "mobx-react";
import NoteAPI from "../../api/note";

const SendNote = (props) => {
  return useObserver(() => {
    const [form] = Form.useForm();
    const state = useLocalStore(() => {
      return {
        confirmLoading: false,
        error: "",
      };
    });

    const handleOk = () => {
      state.confirmLoading = true;
      form.submit();
    };

    // 141.164.41.213:8081/v1/api/note/write
    const onFinish = (values) => {
      (async () => {
        try {
          const res = await NoteAPI.post({
            data: Object.assign(values, { sendId: "보낸 사람" }),
          });
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
          onCancel={props.onCancel}
          footer={[
            <Button key="cancel" onClick={props.onCancel}>
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
          <Form layout="horizontal" onFinish={onFinish} form={form}>
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
