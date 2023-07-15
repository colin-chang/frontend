import { defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
export default {
    title: '重拾大前端',
    description: '拥抱大前端时代',
    base: '/',
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1658902565243/IDyIb_63A.png'
        }]
    ],
    theme:defaultTheme({
        logo:'https://s2.loli.net/2022/08/04/UXqgLBVfzPuvb5A.png',
        logoDark:'https://s2.loli.net/2023/07/16/LUdxHf2yb9oGM7Z.png',        
        repo: 'https://github.com/colin-chang/frontend',
        docsBranch:'master',
        docsDir:'docs',
        navbar: [{
                text: 'Get Start',
                link: '/css/intro'
            },
            {
                text: 'Books',
                children: [{
                        text: 'Python',
                        link: 'https://python.a-nomad.com'
                    },
                    {
                        text: '.Net',
                        link: 'https://dotnet.a-nomad.com'
                    },
                    {
                        text: 'Linux',
                        link: 'https://linux.a-nomad.com'
                    }
                ]
            },
            {
                text: 'Blog',
                link: 'https://a-nomad.com/'
            }
        ],
        sidebar: [
            {
                text: 'HTML5/CSS3',
                collapsible: false,
                children: [
                    '/css/intro',
                    '/css/css3',
                    '/css/mobile'
                ]
            },
            {
                text: 'JavaScript',
                collapsable: false,
                children: [
                    '/js/es',
                    '/js/webapi'
                ]
            },
            {
                text: 'Node.js',
                collapsable: false,
                children: [
                    '/node/basic'
                ]
            }
        ],
        sidebarDepth:3,
        lastUpdatedText: '更新时间',
        contributors:false
    }),
    plugins: [
        docsearchPlugin({
            appId: '9N9PY13ZHL',
            apiKey: '7a269ff154c01ff556c3e662dcb1e3b7',
            indexName: "frontend-a-nomad"
          }),
        googleAnalyticsPlugin({
            ga: 'UA-131744342-1'
        })
    ]
}
