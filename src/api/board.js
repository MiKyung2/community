import AxiosWrapper from "./axiosWrapper";

const BoardAPI = {
  list: async (payload) => {
    try {
      const res = await AxiosWrapper.get(
        "board/page?gb=title&keyword=title&offset=10&pageNumber=1&pageSize=10&sort=title"
      );
      // const res = await AxiosWrapper.get(
      //   `/board/page?pageNumber=10` + `&title=${payload.title}`
      // );

      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default BoardAPI;
