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
        keyword: '',
        input: {
          value: ''
        }
      }
    });

    const onChangeInputValue = (target) => {
      state.input.value = target.value;
    }

    const onSubmit = (searchKeyword) => {

      const searchTerm = {
        gb: state.menu,
        sort: "date",
        keyword: searchKeyword
      }
      state.input.value = searchKeyword;
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

    // local storage에서 최근 검색어 3개 가져오기
    const searchHistory = () => {
      if(typeof window === 'undefined') return;
        const getHistory = localStorage.getItem("history") === null ? [] : JSON.parse(localStorage.getItem("history")); 
        const menu = getHistory.map(keyword => (
            <Menu.Item>
              <a target="_blank" data-name={keyword} onClick={onClickSearchHistory}>
                {keyword}
              </a>
            </Menu.Item>
        ))
        return <Menu>{menu}</Menu>;      
    }

    return (
      <div className={props.className}>
        <Dropdown overlay={menu} className="dropdown">
          <a>
            {filterName()}
            <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlay={searchHistory()} className="dropdown">
          <div>
            <Search 
              placeholder="검색어를 입력하세요." 
              onSearch={() => onSubmit(state.input.value)} 
              value={state.input.value}
              onChange={(e) => onChangeInputValue(e.target)}
              onClick={() => state.input.value=""}
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