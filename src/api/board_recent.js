import instance from "./axiosWrapper";

const BoardRecentAPI = {
  get: async (payload) => {
    try {
      const res = await instance.get(`board/recent/${payload.userId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default BoardRecentAPI;

// id: 21,
// title: 'board title:20',
// contents: 'board contents:20',
// writer: 'board writer:20',
// viewCount: 2941123563488528000,
// rowLike: 3497173643241581600,
// rowDisLike: 1899713865594060800,
// itemGb: '',
// createdDate: '2020-08-26T00:08:33',
// commentCnt: 0,
// key: 21