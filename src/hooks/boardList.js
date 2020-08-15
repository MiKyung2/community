
import * as React from "react";

import { useRouter, NextRouter } from "next/router";

import { useLocalStore } from "mobx-react-lite";
import { AppContext } from "../components/App/context";
import { IBoardListProps } from "../components/Board/List";
import CONFIG from '../utils/CONFIG';

import { useObserver } from 'mobx-react';

const BoardContext = React.createContext();

const initializer = (props) => {
  return {
    loading: false,
    list: [1, 2, 3],
  };
};

const action = (props, $) => {
  const router = useRouter();
  const app = React.useContext(AppContext);

  const test = () => {
    console.log("test action dispatched!")
  }

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
