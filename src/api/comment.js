import instance from "./axiosWrapper";

const CommentAPI = {
  get: async (payload) => {
    try {
      const {id} = payload;
      const res = await instance.get(
        `comment/page/${id}`
        );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (payload) => {
    try {
      const res = await instance.post('comment/write', payload);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  event: async (payload) => {
    try {
      const res = await instance.post('comment/event/like', payload);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  delete: async (payload) => {
    try {
      const res = await instance.post('comment/remove', payload);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};

export default CommentAPI;
