const routes = [
  {
    name: "Home",
    url: "/",
    as: "/",
  },
  {
    name: "자유게시판",
    url: "/board/[cate]",
    as: "/board/free",
  },
  {
    name: "공지사항",
    url: "/board/[cate]",
    as: "/board/noti",
  },
  {
    name: "Q&A",
    url: "/board/[cate]",
    as: "/board/qna",
  },
  {
    name: "구인",
    url: "/board/[cate]",
    as: "/board/recruit",
  },
  {
    name: "구직",
    url: "/board/[cate]",
    as: "/board/resumes",
  },
  {
    name: "비밀게시판",
    url: "/board/[cate]",
    as: "/board/secret",
  },
  // {
  //   name: "로그인",
  //   url: "/accounts/signin",
  // },
];

export default routes;

