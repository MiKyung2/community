import { instance } from "../../common";

const boardListBroker = {
  url: `/board/page?pageNumber=10`,
  async read(payload) {
    try {
      const res = await instance.get(this.url + `&title=${payload.title}`);
      console.log("res : ", res);
      const data = {};

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default boardListBroker;
