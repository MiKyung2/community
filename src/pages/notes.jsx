import { useLocalStore, useObserver } from "mobx-react-lite";
import { Input, Menu, Select, Table, Button, Tabs, Popconfirm, message, Pagination } from "antd";
import NoteAPI from "../api/note";
import SendNote from "../components/note/SendNote";
import { SearchOutlined } from '@ant-design/icons';
import cookie from 'cookie';
import jwt from "jsonwebtoken";
import { toJS } from "mobx";
import { AppContext } from "../components/App/context";
import CONFIG from '../utils/config';

const { Option } = Select;
const { Search } = Input;

const { TabPane } = Tabs;

const sendColumns = [
  { title: "제목", dataIndex: "title" },
  { title: "받는 사람", dataIndex: "revId" },
  { title: "보낸 시간", dataIndex: "strCreateDate" },
];

const receiveColumns = [
  { title: "제목", dataIndex: "title" },
  { title: "보낸 사람", dataIndex: "sendId" },
  { title: "받은 시간", dataIndex: "strCreateDate" },
];

const Notes = (props) => {
  return useObserver(() => {
    const global = React.useContext(AppContext);
    const state = useLocalStore(() => {
      return {
        loading: false,
        error: false,
        tabActive: "R",
        pageSize: 10,
        receive: {
          page: 1,
          totalPages: props.receive?.totalElements || 1,
          list: props.receive?.content || [],
        },
        sendnote: {
          page: 1,
          totalPages: 1,
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

    const getSendList = async () => {
      state.sendnote.list = [];
  
      try {
        const res = await NoteAPI.sendList({ pageSize: state.pageSize, userId: global.state.user.userId, page: state.sendnote.page });
        state.sendnote.list = res.content;
        state.sendnote.totalPages = res.totalElements;
      } catch (error) {
        state.error = true;
      }
    };

    const getReceiveList = () => {
      state.receive.list = [];
      (async () => {
        try {
          const res = await NoteAPI.receiveList({ pageSize: state.pageSize, userId: global.state.user.userId, page: state.receive.page });
          state.receive.list = res.content;
          state.receive.totalPages = res.totalElements;
        } catch (error) {
          state.error = true;
        }
      })();
    };

    const getCurrentList = () => {
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

    React.useEffect(() => {
      if (global.state.alarm.note) global.state.alarm.note = false
    }, [global.state.alarm.note]);

    const onChangePage = (page, pageSize) => {
      if (state.tabActive === "S") {
        state.sendnote.list = [];
  
        (async () => {
          try {
            const res = await NoteAPI.sendList({ pageSize: state.pageSize, userId: global.state.user.userId, page: page });
            state.sendnote.list = res.content;
            state.sendnote.page = page;
            state.sendnote.totalPages = res.totalElements;
          } catch (error) {
            state.error = true;
          }
        })();
      } else if (state.tabActive === "R") {
      (async () => {
        try {
          const res = await NoteAPI.receiveList({ pageSize: state.pageSize, userId: global.state.user.userId, page: page });
          state.receive.list = res.content;
          state.receive.page = page;
          state.receive.totalPages = res.totalElements;
        } catch (error) {
          state.error = true;
        }
      })();
      }
      
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
          {/* <Input.Group compact style={{ width: "40%"}}>
            <Select defaultValue="title" style={{ width: '35%' }}>
              <Option value="title">제목</Option>
              <Option value="writer">{state.tabActive === "R" ? "보낸 사람" : "받는 사람"}</Option>
            </Select>
            <Search 
              style={{ width: "65%"}} 
              placeholder="input search text" 
              onSearch={value => console.log(value)} 
              enterButton 
            />
          </Input.Group> */}
        </div>
        <Tabs
          defaultActiveKey={state.tabActive}
          activeKey={state.tabActive}
          onChange={(active) => {
            state.tabActive = active;
          }}
        >
          <TabPane tab="받은 쪽지함" key="R">
            <Table
              rowSelection={rowSelection}
              columns={receiveColumns}
              dataSource={state.receive.list}
              expandable={{
                expandedRowRender: record => <p style={{ marginLeft: "110px" }}>{record.contents}</p>,
                expandRowByClick: true,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { 
                    CONFIG.LOG(`${rowIndex} : ${record.id}`);
                  },
                }
              }}
              pagination={{
                pageSize: state.pageSize,
                total: state.receive.totalPages,
                onChange: onChangePage,
                current: state.receive.page,
              }}
            />
          </TabPane>

          <TabPane tab="보낸 쪽지함" key="S">
            <Table
              rowSelection={rowSelection}
              columns={sendColumns}
              dataSource={state.sendnote.list}
              expandable={{
                expandedRowRender: record => <p style={{ marginLeft: "110px", whiteSpace: "pre" }}>{record.contents}</p>,
                expandRowByClick: true,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => { 
                    CONFIG.LOG(`${rowIndex} : ${record.id}`)
                  },
                }
              }}
              pagination={{
                pageSize: state.pageSize,
                total: state.sendnote.totalPages,
                onChange: onChangePage,
                current: state.sendnote.page,
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
    const receive = await NoteAPI.receiveList({ userId: encodeURI(user), page: 1, pageSize: 5});
    return {
      receive,
    };
  } catch (error) {
    console.error("error : ", error);
  }
};

export default Notes;
