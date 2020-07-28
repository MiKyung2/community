import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import BoardAPI from "../../api/board";

import { Input, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;



const SearchInput = ({ onSubmitSearchInput }) => {

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        filter: null,
        menu: '',
        keyword: ''
      }
    });

    const onSubmit = async (searchTerm) => {
      const boardListSearchRes = await BoardAPI.search(searchTerm)

      onSubmitSearchInput(boardListSearchRes.body.content);
    }

    const onSearch = (searchKeyword) => {

      const searchTerm = {
        gb: state.menu,
        sort: state.menu,
        keyword: searchKeyword
      }

      onSubmit(searchTerm);

    }

    const onClickMenu = (e) => {
      
      const target = e.target.dataset.name;
    
      if(target === "title") {
        // 제목 필터로 검색
        state.menu = target;
        state.filter = target;
      } else {
        // 글쓴이 필터로 검색
        state.menu = target;
        state.filter = target;
      } 
    }
    
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" data-name="title" onClick={onClickMenu}>
            제목
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" data-name="writer" onClick={onClickMenu}>
            글쓴이
          </a>
        </Menu.Item>
      </Menu>
    );

    const filterName = () => {

      let filter;
      
      if(state.filter === null) {
        filter = "필터"
      } else if (state.filter === "title") {
        filter = "제목"
      } else if (state.filter === "writer") {
        filter = "글쓴이"
      } else {
        console.log("검색 필터 이름 에러.")
      }

      return filter;
    }

    return (
      <div>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link">
            {filterName()}
            <DownOutlined />
          </a>
        </Dropdown>
        <Search 
          placeholder="검색어를 입력하세요." 
          onSearch={onSearch} 
          onClick={(e) => e.target.value=""}
          enterButton 
        />
      </div>
    );
  });
};

export default styled(SearchInput)`
`;