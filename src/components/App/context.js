import * as React from "react";

export const AppContext = React.createContext({
  status: { loading: false },
  user: {
    id: '',
    email: '',
    name: '',
    token: '',
    level: '',
  },
});
