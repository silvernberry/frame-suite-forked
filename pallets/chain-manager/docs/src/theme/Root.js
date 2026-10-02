import React from 'react';
import { useLocation } from '@docusaurus/router';
import HomeFooter from '@site/src/components/HomeFooter';

export default function Root({ children }) {
  const { pathname } = useLocation();

  const isHome =
    pathname === '/' ||
    pathname === '/frame-suite-forked/pallet-chain-manager/' ||
    pathname === '/frame-suite-forked/pallet-chain-manager';

  return (
    <>
      {children}
      {!isHome && <HomeFooter />}
    </>
  );
}