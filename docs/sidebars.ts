import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'installation',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['getting-started/standalone', 'getting-started/module'],
    },
    'configuration',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/i18n',
        'guides/custom-classnames',
        'guides/conditional-display',
        'guides/custom-patterns',
        'guides/custom-validators',
      ],
    },
    {
      type: 'category',
      label: 'Migration',
      items: ['migration/v3-to-v4'],
    },
  ],
}

export default sidebars
