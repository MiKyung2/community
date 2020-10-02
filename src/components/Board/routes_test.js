import React from "react";
import { AppContext } from "../App/context";



const routes_test = () => {
  const global = React.useContext(AppContext);
  const test_role = "Y";


  return [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "자유게시판",
      url: "/board/free",
    },
    {
      name: "공지사항",
      url: "/board/noti",
    },
    {
      name: "Q&A",
      url: "/board/qna",
    },
    {
      name: "구인",
      url: "/board/recruit",
    },
    {
      name: "구직",
      url: "/board/resumes",
    },
    test_role === 'A' &&
    {
      name: "비밀게시판",
      url: "/board/secret",
    },
    // {
    //   name: "로그인",
    //   url: "/accounts/signin",
    // },
  ];
} 

export default routes_test;

