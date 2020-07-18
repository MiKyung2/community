import styled from "styled-components";
import { Select, Input, Button } from "antd";

const { Option } = Select;

const ModifyBoard = () => {
  const handleChange = () => {
    console.log("handle change of select:");
  };

  const cancle = (e) => {
    console.log("게시글 수정 - 취소");
  };

  const modify = (e) => {
    console.log("게시글 수정 - 수정");
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <div>
        <Select
          defaultValue="default"
          style={{ width: "80%" }}
          onChange={handleChange}
        >
          <Option value="default">게시판을 선택해주세요.</Option>
          <Option value="option1">Option1</Option>
          <Option value="option2">Option2</Option>
          <Option value="option3">Option3</Option>
        </Select>
        <Input style={{ width: "80%" }} placeholder="게시글 예시1" />
        {/* 내용 입력칸 + 에디터 기능 추가 */}
      </div>
      <div className="board__buttons">
        <Button type="default" onClick={cancle}>
          취소
        </Button>
        <Button type="primary" onClick={modify}>
          수정
        </Button>
      </div>
    </div>
  );
};

export default styled(ModifyBoard)``;
