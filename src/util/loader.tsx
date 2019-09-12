import { Spin } from 'antd';
import * as React from 'react';
import Loadable from 'react-loadable';

export const loadView = (path: string) =>
  Loadable({
    loader: () =>
      import(
        /* webpackExclude: /\.d\.ts$/ */
        `./view/${path}`
      ),
    loading: () => <Spin />,
  });
