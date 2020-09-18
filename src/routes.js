const routes = [
  {
    name: "Home",
    url: "/",
    as: "/",
    role: ''
  },
  {
    name: "자유게시판",
    url: "/board/[cate]",
    as: "/board/free",
    role: ''
  },
  {
    name: "공지사항",
    url: "/board/[cate]",
    as: "/board/noti",
    role: 'Y'
  },
  {
    name: "Q&A",
    url: "/board/[cate]",
    as: "/board/qna",
    role: 'Y'
  },
  {
    name: "구인",
    url: "/board/[cate]",
    as: "/board/recruit",
    role: 'Y'
  },
  {
    name: "구직",
    url: "/board/[cate]",
    as: "/board/resumes",
    role: 'Y'
  },
  {
    name: "비밀게시판",
    url: "/board/[cate]",
    as: "/board/secret",
    role: 'A'
  },
];

export default routes;

