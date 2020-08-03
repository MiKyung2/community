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

      state.menu = target;
      state.filter = target;

    }

    const filterName = () => {

      let filter;

      switch(state.filter) {
        case 'title' :
          filter = "제목"
          break;
        case 'writer' :
          filter = "글쓴이"
          break;
        case 'contents' :
          filter = "내용"
          break;
        default :
          filter = '필터'
      }

      return filter;
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
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" data-name="contents" onClick={onClickMenu}>
            내용
          </a>
        </Menu.Item>
      </Menu>
    );

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