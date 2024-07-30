import React, { PropsWithChildren } from 'react';
import { WIDGET_PREFIX } from '../../constant';

export const Footer: React.FC<PropsWithChildren> = React.memo((props) => {
  const { children } = props;

  return <div className={`${WIDGET_PREFIX}-footer`}>{children}</div>;
});
