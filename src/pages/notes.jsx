import { useLocalStore, useObserver } from "mobx-react-lite";
import { Table, Button, Tabs, Popconfirm, message } from "antd";
import NoteAPI from "../api/note";
import SendNote from "../components/note/SendNote";

const { TabPane } = Tabs;

const sendColumns = [
  { title: "제목", dataIndex: "title" },
  { title: "받는 사람", dataIndex: "revId" },
  { title: "보낸 시간", dataIndex: "createdDate" },
];

const receiveColumns = [
  { title: "제목", dataIndex: "title" },
  { title: "보낸 사람", dataIndex: "sendId" },
  { title: "받은 시간", dataIndex: "createdDate" },
];

const Notes = (props) => {
  return useObserver(() => {
    const state = useLocalStore(() => {
      return {
        loading: false,
        error: false,
        tabActive: "R",
        receiveList: props.receiveList || [],
        sendList: [],
        delete: {
          loading: false,
          selectedRowKeys: [],
        },
        send: {
          loading: false,
          open: false,
        },
      };
    });

    const onDelete = () => {
      state.delete.loading = true;

      (async () => {
        try {
          const res = await NoteAPI.remove({
            data: {
              gb: state.tabActive,
              id: state.delete.selectedRowKeys,
            }
          });

          state.delete.selectedRowKeys = [];
          getCurrentList();
        } catch (error) {
          // state.error = true;
        } finally {
          state.delete.loading = false;
        }
      })();
    };

    const onSelectChange = (selectedRowKeys) => {
      state.delete.selectedRowKeys = selectedRowKeys;
    };

    const rowSelection = {
      selectedRowKeys: state.delete.selectedRowKeys,
      onChange: onSelectChange,
    };

    const hasSelected = state.delete.selectedRowKeys.length > 0;

    const getSendList = () => {
      state.sendList = [];
      (async () => {
        try {
          const res = await NoteAPI.sendList({ userId: 1 });
          state.sendList = res;
        } catch (error) {
          state.error = true;
        }
      })();
    };

    const getReceiveList = () => {
      state.receiveList = [];
      (async () => {
        try {
          const res = await NoteAPI.receiveList({ userId: 1 });
          state.receiveList = res;
        } catch (error) {
          state.error = true;
        }
      })();
    };

    const getCurrentList = () => {
      state.delete.selectedRowKeys = [];

      switch (state.tabActive) {
        case "R":
          getReceiveList();
          break;
        case "S":
          getSendList();
          break;
      }
    };

    React.useEffect(() => {
      state.delete.selectedRowKeys = [];

      getCurrentList();
    }, [state.tabActive]);

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            style={{ marginRight: 8 }}
            type="primary"
            onClick={() => {
              state.send.open = true;
            }}
            loading={state.send.loading}
          >
            쪽지쓰기
          </Button>
          <Popconfirm
            placement="bottomRight"
            title="정말로 선택한 쪽지를 삭제하시겠습니까?"
            disabled={!hasSelected}
            onConfirm={() => {
              message.info("선택하신 쪽지가 삭제되었습니다.");
              onDelete();
            }}
            okText="확인"
            cancelText="취소"
          >
            <Button
              type="primary"
              disabled={!hasSelected}
              loading={state.delete.loading}
            >
              삭제
            </Button>
          </Popconfirm>
        </div>
        <Tabs
          defaultActiveKey={state.tabActive}
          onChange={(active) => {
            state.tabActive = active;
          }}
        >
          <TabPane tab="받은 쪽지함" key="R">
            <Table
              rowSelection={rowSelection}
              columns={receiveColumns}
              dataSource={state.receiveList}
              expandable={{
                expandedRowRender: record => <p style={{ marginLeft: "110px" }}>{record.contents}</p>,
                expandRowByClick: true,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { 
                    console.log(`${rowIndex} : ${record.id}`)
                  },
                }
              }}
            />
          </TabPane>
          <TabPane tab="보낸 쪽지함" key="S">
            <Table
              rowSelection={rowSelection}
              columns={sendColumns}
              dataSource={state.sendList}
              expandable={{
                expandedRowRender: record => <p style={{ marginLeft: "110px" }}>{record.contents}</p>,
                expandRowByClick: true,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { 
                    console.log(`${rowIndex} : ${record.id}`)
                  },
                }
              }}
            />
          </TabPane>
        </Tabs>

        <SendNote
          visible={state.send.open}
          onCancel={() => {
            state.send.open = false;
          }}
          onFinish={() => { 
            if (state.tabActive === "S") getSendList();
          }}
        />
      </div>
    );
  });
};

Notes.getInitialProps = async () => {
  try {
    const receiveList = await NoteAPI.receiveList({ userId: 8 });
    return {
      receiveList,
    };
  } catch (error) {
    console.error("error : ", error);
  }
};

export default Notes;
