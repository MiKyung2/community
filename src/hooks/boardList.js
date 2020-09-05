
import * as React from "react";

import { useRouter, NextRouter } from "next/router";

import { useLocalStore } from "mobx-react-lite";
import { AppContext } from "../components/App/context";
import { IBoardListProps } from "../components/Board/List";
import CONFIG from '../utils/config';

const initializer = (props) => {
  return {
    loading: false,
    list: [],
  };
};

const action = (props, $) => {
  const router = useRouter();
  const app = React.useContext(AppContext);

  return {};
};

const useBoardList = (props) => {
  const app = React.useContext(AppContext);
  const router = useRouter();

  const $ = useLocalStore(() => ({ state: initializer(props) }));
  const dispatch = action(props, $);

  React.useEffect(() => {

  });

  return { state: $.state, dispatch };
}

export default useBoardList;
