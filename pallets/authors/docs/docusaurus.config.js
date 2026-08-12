import {themes as prismThemes} from 'prism-react-renderer';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pallet-Authors',
  tagline: 'An economically secured role system for managing authors (validators) with collateral, staking, elections, and lifecycle primitives',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, 
  },

  markdown: {
  mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs',
            to: '/docs/intro',
          },
        ],
      },
    ],
  ],

  url: 'https://silvernberry.github.io',
  baseUrl: '/frame-suite-forked/pallet-authors/',

  organizationName: 'silvernberry', 
  projectName: 'frame-suite-forked',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/silvernberry/frame-suite-forked/tree/master/pallets/authors/docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    mermaid: {
      theme: {
        light: 'dark',
        dark: 'dark',
      },
      options: {
        themeVariables: {
          primaryColor: '#1C1C1F',
          primaryTextColor: '#E8E2D0',
          primaryBorderColor: '#D4AF37',
          lineColor: '#9A9078',
          secondaryColor: '#161618',
          tertiaryColor: '#1C1C1F',
          background: '#0F0F10',
          mainBkg: '#161618',
          nodeBorder: '#D4AF37',
          clusterBkg: '#1C1C1F',
          titleColor: '#D4AF37',
          edgeLabelBackground: '#0F0F10',
          fontFamily: 'Crimson Pro, serif',

          /*--- Sequence diagram specific ---*/
          actorBkg: '#161618',
          actorBorder: '#D4AF37',
          actorTextColor: '#E8E2D0',
          actorLineColor: '#D4AF37',
          signalColor: '#9A9078',
          signalTextColor: '#E8E2D0',
          labelBoxBkgColor: '#161618',
          labelBoxBorderColor: '#D4AF37',
          labelTextColor: '#E8E2D0',
          loopTextColor: '#E8E2D0',
          noteBorderColor: '#0F8B6D',
          noteBkgColor: '#1C1C1F',
          noteTextColor: '#E8E2D0',
          activationBorderColor: '#D4AF37',
          activationBkgColor: '#1C1C1F',
          sequenceNumberColor: '#0F0F10',
        },
      },
    },
  },

};

export default config;
