import styled from "styled-components";
import { useObserver, useLocalStore } from "mobx-react";
import { Modal, Form, Input, Button } from "antd";

const sendNote = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        confirmLoading: false,
      };
    });

    const handleOk = () => {
      state.confirmLoading = true;

      setTimeout(() => {
        state.confirmLoading = false;
        props.onCancel();
      }, 2000);
    };

    const [form] = Form.useForm();
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
          <Form layout="horizontal" form={form}>
            <Input
              style={{
                borderRadius: 0,
                borderTop: 0,
                borderRight: 0,
                borderLeft: 0,
              }}
              placeholder="받는 사람"
            />
            <Input
              style={{
                borderRadius: 0,
                borderTop: 0,
                borderRight: 0,
                borderLeft: 0,
              }}
              placeholder="제목"
            />
            <Input.TextArea
              style={{
                borderRadius: 0,
                borderTop: 0,
                borderRight: 0,
                borderLeft: 0,
              }}
              autoSize={{ minRows: 10, maxRows: 10 }}
              placeholder="내용"
            />
          </Form>
        </Modal>
      </div>
    );
  });
};

export default styled(sendNote)`
  & {
    .ant-modal-mask {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .ant-modal {
      position: absolute;
      top: none;
      right: 50px;
      bottom: 0;
      padding-bottom: 0px;
    }
  }
`;
