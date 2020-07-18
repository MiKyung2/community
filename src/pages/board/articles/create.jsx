import styled from "styled-components";
import { Menu, Select, Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateBoard = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="http://www.naver.com/">제목</a>
      </Menu.Item>
      <Menu.Item>
        <a href="http://www.naver.com/">글쓴이</a>
      </Menu.Item>
    </Menu>
  );

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("폼 제출");
    // 1) 등록 api 요청
    // 2) 글 목록 or 해당 글로 이동
  };

  const handleChange = () => {
    console.log("게시판 선택");
  };

  const cancle = (e) => {
    console.log("새 글 작성 - 취소");
    // 글목록 or 해당 글로 이동
  };

  return (
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{ border: "1px solid blue", width: "80%" }}
      >
        <header
          style={{
            border: "1px solid red",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <h2>새 글 작성</h2>
          <Avatar size="large" icon={<UserOutlined />} />
        </header>

        <section>
          <form onSubmit={onSubmitForm}>
            <Select
              defaultValue="default"
              style={{ width: "100%", marginBottom: "20px" }}
              onChange={handleChange}
            >
              <Option value="default">게시판을 선택해주세요.</Option>
              <Option value="option1">Option1</Option>
              <Option value="option2">Option2</Option>
              <Option value="option3">Option3</Option>
            </Select>
            <Input
              style={{ width: "100%", marginBottom: "20px" }}
              placeholder="제목을 입력해주세요."
            />
            {/* 내용 입력칸 + 에디터 기능 추가 */}
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button type="default" onClick={cancle}>
                취소
              </Button>
              <Button type="primary" htmlType="submit">
                등록
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default styled(CreateBoard)``;
