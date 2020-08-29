import { useLocalStore, useObserver } from "mobx-react-lite";
import { Input, Menu, Select, Table, Button, Tabs, Popconfirm, message } from "antd";
import NoteAPI from "../api/note";
import SendNote from "../components/note/SendNote";
import { SearchOutlined } from '@ant-design/icons';
import cookie from 'cookie';
import jwt from "jsonwebtoken";
import { toJS } from "mobx";

const { Option } = Select;
const { Search } = Input;

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
      console.log("content : ", props.receiveList.content);
      return {
        loading: false,
        error: false,
        tabActive: "R",
        receive: {
          page: 1,
          totalPage: props.receiveList.totalPages,
          list: props.receiveList.content || [],
        },
        send: {
          page: 1,
          totalPage: 1,
          list: [],
        },
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
    console.log("list : ", toJS(state));
    // console.log("list props :", toJS(props));
    // console.log("list state :", toJS(state));
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
      state.send.list = [];
      (async () => {
        try {
          const res = await NoteAPI.sendList({ userId: global.state.user.userId, page: state.send.page });
          // console.log("res : ", toJS(res));
          // state.sendList = res;
        } catch (error) {
          state.error = true;
        }
      })();
    };

    const getReceiveList = () => {
      state.receive.list = [];
      (async () => {
        try {
          const res = await NoteAPI.receiveList({ userId: global.state.user.userId, page: state.receive.page });
          // console.log("res : ", toJS(res));
          // state.receive = res;
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
      // if (props.ssr) return;
      getCurrentList();
    }, [state.tabActive]);

    const onChangePage = (page, pageSize) => {
      state.send.page = page;
      getCurrentList();
    }

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
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
          <Input.Group compact style={{ width: "40%"}}>
            <Select defaultValue="title" style={{ width: '35%' }}>
              <Option value="title">제목</Option>
              <Option value="writer">{state.tabActive === "R" ? "보낸 사람" : "받는 사람"}</Option>
            </Select>
            <Search style={{ width: "65%"}} placeholder="input search text" onSearch={value => console.log(value)} enterButton />
          </Input.Group>
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
              dataSource={state.receive.content}
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
          {/* {console.log("list : ", toJS(state.send))} */}
          <TabPane tab="보낸 쪽지함" key="S">
            <Table
              rowSelection={rowSelection}
              columns={sendColumns}
              dataSource={state.send.list}
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
              pagination={{
                pageSize: 20,
                total: state.send.totalPage,
                onChange: onChangePage,
                current: state.send.page,
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

Notes.getInitialProps = async (ctx) => {
  const ck = cookie.parse(
    (ctx.req ? ctx.req.headers.cookie : document.cookie) ?? '',
  );
  const token = ck.token ?? "";
  const decodedToken = jwt.decode(token.replace("Bearer ", ""));
  const user = decodedToken?.userId ?? "";

  try {
    const receiveList = await NoteAPI.receiveList({ userId: user, page: 1 });
    return {
      receiveList,
    };
  } catch (error) {
    console.error("error : ", error);
  }
};

export default Notes;
