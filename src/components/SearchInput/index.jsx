import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';

import { Input, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;



const SearchInput = (props) => {

  const { onSearch } = props;

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        filter: null,
        menu: '',
        keyword: ''
      }
    });

    const onSubmit = (searchKeyword) => {

      const searchTerm = {
        gb: state.menu,
        sort: "date",
        keyword: searchKeyword
      }
      onSearch(searchTerm);
    }

    const onClickMenu = (e) => {
      
      const target = e.target.dataset.name;

      state.menu = target;
      state.filter = target;

    }

    const onClickSearchHistory = (e) => {
      const searchValue = e.target.dataset.name;
      onSubmit(searchValue);
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

    const searchHistory = (
      <Menu>
        <Menu.Item>
          <a target="_blank" data-name="속보" onClick={onClickSearchHistory}>
            속보
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" data-name="title" onClick={onClickSearchHistory}>
            title
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" data-name="alice" onClick={onClickSearchHistory}>
            alice
          </a>
        </Menu.Item>
      </Menu>
    )

    return (
      <div className={props.className}>
        <Dropdown overlay={menu} className="dropdown">
          <a>
            {filterName()}
            <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlay={searchHistory} trigger={['click']} className="dropdown">
          <div>
            <Search 
              placeholder="검색어를 입력하세요." 
              onSearch={onSubmit} 
              onClick={(e) => e.target.value=""}
              enterButton 
              maxLength="255"
              className="input"
            />
          </div>
       </Dropdown>

      </div>
    );
  });
};

export default styled(SearchInput)`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  & {
    .dropdown {
      margin-right: 10px;
      color: gray;
    }
    .input {
      /* border: 1px solid blue; */
      width: 300px;
    }
  }
`;