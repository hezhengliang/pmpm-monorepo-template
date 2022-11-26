import { defineConfig } from 'vitepress'
import mdItCustomAttrs  from 'markdown-it-custom-attrs'
export default defineConfig({
  title: 'docs',
  description: 'docs',
  lastUpdated: true,
  head:[
    ["link",{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }],
],

  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022 present Eryi'
    },
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: '开始',
              link: '/guide/index'
            },
          ]
        },
      ]
    },
  },
  markdown:{
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
          'data-fancybox': "gallery"
      })
      }
    }
})