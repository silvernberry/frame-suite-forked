import React from 'react';
import Layout from '@theme/Layout';
import HomeNavbar from '@site/src/components/HomeNavbar';
import HomeFooter from '@site/src/components/HomeFooter';
import HeroSection from '@site/src/components/HeroSection';
import KeyFeatures from '@site/src/components/KeyFeatures';
import Lifecycle from '@site/src/components/Lifecycle';
import ThreeModels from '@site/src/components/ThreeModels';
import LazyBalanceEngine from '@site/src/components/LazyBalanceEngine';
import UseCases from '@site/src/components/UseCases';
import ReadyToBuild from '@site/src/components/ReadyToBuild';
import Community from '@site/src/components/Community';
import BridgeStrip from '@site/src/components/BridgeStrip';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout description="A reusable bonding primitive for Substrate runtimes." noFooter hideNavbar>
      <div className={styles.page}>
        <HomeNavbar />
        <main>
          <HeroSection />
          <BridgeStrip/>
          <Lifecycle/>
          <ThreeModels/>
          <KeyFeatures/>
          <LazyBalanceEngine/>
          <UseCases/>
          <ReadyToBuild/>
          <Community/>
          <HomeFooter/>
        </main>
      </div>
    </Layout>
  );
}