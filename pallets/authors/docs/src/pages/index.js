import React from 'react';
import Layout from '@theme/Layout';
import HomeNavbar from '@site/src/components/HomeNavbar';
import HomeFooter from '@site/src/components/HomeFooter';
import HeroSection from '@site/src/components/HeroSection';
import HeroSectionV2 from '@site/src/components/HeroSectionV2';
import BridgeStrip from '@site/src/components/BridgeStrip';
import AuthorLifecycle from '@site/src/components/AuthorLifecycle';
import AuthorBacking from '@site/src/components/AuthorBacking';
import ElectingAuthor from '@site/src/components/ElectingAuthor';
import RewardsPenalties from '@site/src/components/RewardsNPenalties';
import Governance from '@site/src/components/Governance';
import UseCases from '@site/src/components/UseCases';
import Community from '@site/src/components/Community';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Pallet Authors" noFooter hideNavbar>
      <div className={styles.page}>
        <HomeNavbar />
        <main>
          <HeroSection />
          <BridgeStrip />
          <AuthorLifecycle />
          <AuthorBacking />
          <ElectingAuthor />
          <RewardsPenalties />
          <Governance />
          <UseCases />
          <Community />
          <HomeFooter/>
        </main>
      </div>
    </Layout>
  );
}