import React, { PropsWithChildren } from 'react';
import { WIDGET_PREFIX } from '../../constant';

export const Header: React.FC<PropsWithChildren> = React.memo((props) => {
  const { children } = props;

  return <div className={`${WIDGET_PREFIX}-header`}>{children}</div>;
});
