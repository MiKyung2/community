const routes = [
  {
    name: "Home",
    url: "/",
    as: "/",
    role: "",
  },
  {
    name: "자유게시판",
    url: "/board/[cate]",
    as: "/board/free",
    role: "",
  },
  {
    name: "공지사항",
    url: "/board/[cate]",
    as: "/board/noti",
    role: "",
  },
  {
    name: "Q&A",
    url: "/board/[cate]",
    as: "/board/qna",
    role: "",
  },
  {
    name: "구인",
    url: "/board/[cate]",
    as: "/board/recruit",
    role: "",
  },
  {
    name: "구직",
    url: "/board/[cate]",
    as: "/board/resumes",
    role: "",
  },
  {
    name: "비밀게시판",
    url: "/board/[cate]",
    as: "/board/secret",
    role: "A",
  },
  // {
  //   name: "로그인",
  //   url: "/accounts/signin",
  // },
];

export default routes;

