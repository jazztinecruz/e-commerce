import getUser from "./user/get-user";

const api = {
  get: {
    user: () => getUser(),
  },
};

export default api;
