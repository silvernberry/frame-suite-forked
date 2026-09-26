import {themes as prismThemes} from 'prism-react-renderer';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pallet-Authors',
  tagline: 'An economically secured role system for managing authors (validators) with collateral, staking, elections, and lifecycle primitives',
  favicon: 'img/favicon-1.png',

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
      defaultMode: 'light', 
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {
        light: 'base', 
        dark: 'base',  
      },
      options: {
        themeVariables: {
          primaryColor: '#eff6fc',       
          primaryTextColor: '#0b1220',    
          primaryBorderColor: '#0f6cbd',  
          lineColor: '#4b5768',           
          secondaryColor: '#f7fafe',     
          tertiaryColor: '#e4eefb',      
          background: '#ffffff',         
          mainBkg: '#ffffff',             
          nodeBorder: '#0f6cbd',          
          clusterBkg: '#eff6fc',         
          titleColor: '#0a3d91',          
          edgeLabelBackground: '#ffffff', 
          fontFamily: "'Segoe UI Variable Text', 'Segoe UI', -apple-system, BlinkMacSystemFont, Inter, Roboto, sans-serif", 

          /*--- Sequence diagram specific ---*/
          actorBkg: '#eff6fc',           
          actorBorder: '#0f6cbd',         
          actorTextColor: '#0b1220',      
          actorLineColor: '#0f6cbd',      
          signalColor: '#4b5768',         
          signalTextColor: '#0b1220',     
          labelBoxBkgColor: '#eff6fc',    
          labelBoxBorderColor: '#0f6cbd', 
          labelTextColor: '#0b1220',     
          loopTextColor: '#0b1220',       
          noteBorderColor: '#0f7d58',     
          noteBkgColor: '#f7fafe',        
          noteTextColor: '#0b1220',      
          activationBorderColor: '#0f6cbd', 
          activationBkgColor: '#eff6fc', 
          sequenceNumberColor: '#ffffff', 
        },
      },
    },
  },

};

export default config;
