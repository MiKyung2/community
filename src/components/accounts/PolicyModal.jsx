import React from 'react';
import { Modal, Card, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import { policy } from './policy';

function TableCellBlock(props) {
  const style = {
    border: '1px solid #ccc',
    textAlign: props.align ? props.align : 'center',
    padding: 5,
  };

  if (props.isHeader) {
    style.height = '50px';
  } else {
    style.textAlign = 'left';
    style.height = '150px';
    style.width = '33%';
  }

  return <td style={style}>{props.children}</td>;
}

const PolicyModal = ({ visible, setVisible }) => {
  const handleOk = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      style={{
        top: 80, width: 700, height: 'auto', overflow: 'scroll',
      }}
      onOk={handleOk}
      closable={false}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          확인
        </Button>,
      ]}
    >
      <Card
        title="개인정보취급방침"
        style={{ height: 550, overflow: 'scroll' }}
      >
        <ReactMarkdown
          source={policy}
          skipHtml={false}
          escapeHtml={false}
          renderers={{ tableCell: TableCellBlock }}
        />
      </Card>
    </Modal>
  );
};

export default PolicyModal;
