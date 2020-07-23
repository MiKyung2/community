import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';

import { Input, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;



const SearchInput = () => {

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        filter: null,
        menu: '',
        keyword: ''
      }
    });

    const onSearch = (keyword) => {
      // 검색 키워드로 게시판 목록 api 요청

      const searchTerm = {
        filter: state.menu,
        keyword: keyword
      }

      console.log(searchTerm);
    }

    const onClickMenu = (e) => {
      // console.log("필터 menu clicked!", e.target.dataset.name);
      
    
      const target = e.target.dataset.name;
    
      if(target === "title") {
        console.log("제목 필터 clicked!");
        // 제목 필터로 검색
        state.menu = target;
        state.filter = target;
      } else {
        console.log("글쓴이 필터 clicked!");
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
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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