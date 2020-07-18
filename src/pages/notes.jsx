import { useLocalStore } from "mobx-react-lite";
import { Table, Button } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const notes = () => {
  const state = useLocalStore(() => {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  });

  const start = () => {
    state.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
      state.selectedRowKeys = [];
      state.loading = false;
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = state.selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={state.loading}
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${state.selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export const getInitialProps = async () => {
  return {
    props: {},
  };
};

export default notes;
