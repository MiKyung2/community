import styled from 'styled-components';
import { useObserver, useLocalStore } from 'mobx-react';
import BoardAPI from "../../api/board";
import axios from 'axios';

import { Input, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;



const SearchInput = () => {
<<<<<<< HEAD

  return useObserver(() => {

    const state = useLocalStore(() => {
      return {
        filter: null,
        menu: '',
        keyword: ''
      }
    });

    const onSearch = async (searchKeyword) => {
      // 검색 키워드로 게시판 목록 api 요청

      const searchTerm = {
        gb: state.menu,
        sort: state.menu,
        keyword: searchKeyword
      }

      console.log("검색!", searchTerm);





      
      const {gb, sort, keyword} = searchTerm;
      const res = await axios.get(`http://141.164.41.213:8081/v1/api/board/page?gb=${gb}&keyword=${keyword}&sort=${sort}`)

      console.log("검색 결과 api 데이터", res.data);








      // const boardListRes = await BoardAPI.searchInput(searchTerm);
      // console.log(boardListRes);
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
=======
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          제목
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          글쓴이
        </a>
      </Menu.Item>
    </Menu>
  );

  const onSearch = (keyword) => {
      // 검색 키워드로 게시판 목록 api 요청
      console.log("검색 키워드:", keyword);
  }

  return (
    <div>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          필터 
          <DownOutlined />
        </a>
      </Dropdown>
      <Search 
        placeholder="검색어를 입력하세요." 
        onSearch={onSearch} 
        enterButton 
      />
    </div>
  );
>>>>>>> 05018038492155c1304e56896f94d54fb6bd8aaf
};

export default styled(SearchInput)`
`;