import React from 'react';
import { secondTime } from '../util/second-time';

type Props = {
  value: number;
  className: string;
};

export function Timer(props: Props): JSX.Element {
  return <div className={props.className}>{secondTime(props.value)}</div>;
}
