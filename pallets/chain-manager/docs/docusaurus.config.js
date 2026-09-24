import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pallet-Chain-Manager',
  tagline: 'A session-driven orchestration pallet coordinating validator selection, participation, and settlement using offchain workers and pluggable models',
  favicon: 'img/docusaurus.png',

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
  baseUrl: '/frame-suite-forked/pallet-chain-manager/',

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
            'https://github.com/silvernberry/frame-suite-forked/tree/master/pallets/chain-manager/docs',
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
      theme: prismThemes.gruvboxMaterialDark,
      darkTheme: prismThemes.gruvboxMaterialDark,
    },
    mermaid: {
      theme: {
        light: 'base',
        dark: 'base',
      },
      options: {
        themeVariables: {
          primaryColor: '#E7DBB9',        
          primaryTextColor: '#211C13',    
          primaryBorderColor: '#8A1F1F', 
          lineColor: '#4C4230',           
          secondaryColor: '#F1E9D2',     
          tertiaryColor: '#DCCEA2',       
          background: '#F1E9D2',        
          mainBkg: '#E7DBB9',         
          nodeBorder: '#B39F72',         
          clusterBkg: '#DCCEA2',          
          titleColor: '#8A1F1F',          
          edgeLabelBackground: '#F1E9D2', 
          fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif", 

          /*--- Sequence diagram specific ---*/
          actorBkg: '#DCCEA2',            
          actorBorder: '#8A1F1F',       
          actorTextColor: '#211C13',    
          actorLineColor: '#B39F72',    
          signalColor: '#4C4230',         
          signalTextColor: '#211C13',    
          labelBoxBkgColor: '#DCCEA2',   
          labelBoxBorderColor: '#B39F72',
          labelTextColor: '#211C13',    
          loopTextColor: '#211C13',    
          noteBorderColor: '#8F6F2A',     
          noteBkgColor: '#EAD9A6',        
          noteTextColor: '#211C13',       
          activationBorderColor: '#8A1F1F', 
          activationBkgColor: '#E7DBB9',  
          sequenceNumberColor: '#F1E9D2',
        },
      },
    },
  },

};

export default config;
