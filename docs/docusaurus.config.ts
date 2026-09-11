import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'NgxErrorMessage',
  tagline:
    'Automatic error messages for Angular reactive and template-driven forms',
  favicon: 'img/favicon.ico',
  url: 'https://darioegb.github.io',
  baseUrl: '/ngx-error-message/',
  organizationName: 'darioegb',
  projectName: 'ngx-error-message',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      es: { label: 'Español', direction: 'ltr' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/darioegb/ngx-error-message/tree/main/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: '4.x (latest)',
              badge: true,
            },
            '3.x': {
              label: '3.x',
              badge: true,
              banner: 'unmaintained',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: 'NgxErrorMessage',
      logo: {
        alt: 'NgxErrorMessage logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/ngx-error-message',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/darioegb/ngx-error-message',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/' },
            { label: 'Installation', to: '/installation' },
            { label: 'Configuration', to: '/configuration' },
          ],
        },
        {
          title: 'Guides',
          items: [
            { label: 'Internationalization', to: '/guides/i18n' },
            { label: 'Custom Class Names', to: '/guides/custom-classnames' },
            {
              label: 'Conditional Display',
              to: '/guides/conditional-display',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'npm package',
              href: 'https://www.npmjs.com/package/ngx-error-message',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/darioegb/ngx-error-message',
            },
            {
              label: 'Stackblitz Example',
              href: 'https://stackblitz.com/edit/ngx-error-message-example',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dario Gonzalez. Released under the MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
