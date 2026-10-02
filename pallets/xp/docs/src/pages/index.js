import React from 'react';
import Layout from '@theme/Layout';
import HomeNavbar from '@site/src/components/HomeNavbar';
import HeroSection from '@site/src/components/HeroSection';
import BridgeStrip from '@site/src/components/BridgeStrip';
import ReadyToBuild from '@site/src/components/ReadyToBuild';
import Community from '@site/src/components/Community';
import HomeFooter from '@site/src/components/HomeFooter';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Experience Points (XP) for Substrate Runtimes" description="A reputation primitive for Web3." noFooter hideNavbar>
      <div className={styles.page}>
        {/* <HomeNavbar /> */}
        <main>
          <HeroSection />
          <BridgeStrip />
          <ReadyToBuild />
          <Community />
          <HomeFooter/>
        </main>
      </div>
    </Layout>
  );
}