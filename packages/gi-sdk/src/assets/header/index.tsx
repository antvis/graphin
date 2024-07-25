import React, { PropsWithChildren } from 'react';
import { PREFIX } from '../../constants';
import './index.less';

export const Header: React.FC<PropsWithChildren> = props => {
  const { children } = props;

  return <div className={`${PREFIX}-header`}>{children}</div>;
};
