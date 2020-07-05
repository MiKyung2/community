import AxiosWrapper from "../../axiosWrapper";

const boardListBroker = {
  url: `/board/page?pageNumber=10`,
  async read(payload) {
    try {
      const res = await AxiosWrapper.get(this.url + `&title=${payload.title}`);

      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default boardListBroker;
