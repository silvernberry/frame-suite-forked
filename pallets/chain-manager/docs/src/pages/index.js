import React from 'react';
import Layout from '@theme/Layout';
import HomeNavbar from '@site/src/components/HomeNavbar';
import HomeFooter from '@site/src/components/HomeFooter';
import Hero from '@site/src/components/Hero';
import MetaStrip from '@site/src/components/MetaStrip';
import Guilloche from '@site/src/components/Guilloche';
import ReadyToBuild from '@site/src/components/ReadyToBuild';
import Community from '@site/src/components/Community';

import styles from './index.module.css';

export default function Home() {
  return (
    <Layout description="A session-driven orchestration pallet coordinating validator selection, participation, and settlement using offchain workers and pluggable models" noFooter hideNavbar>
      <div className={styles.page}>
        <HomeNavbar />
        <main>
          <Hero />
          <MetaStrip />
          <ReadyToBuild/>
          <Guilloche/>
          <Community/>
          <HomeFooter/>
        </main>
      </div>
    </Layout>
  );
}