module.exports = {
    title: '重拾大前端',
    description: '拥抱大前端时代',
    base: '/',
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1658902565243/IDyIb_63A.png'
        }]
    ],
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        '@vuepress/medium-zoom',
        ['@vuepress/google-analytics', {
            ga: 'UA-131744342-1'
        }]
    ],
    themeConfig: {
        logo:'https://s2.loli.net/2022/08/04/UXqgLBVfzPuvb5A.png',
        repo: 'https://github.com/colin-chang/frontend',
        smoothScroll:true,
        search: false,
        algolia: {
            apiKey: '7a269ff154c01ff556c3e662dcb1e3b7',
            indexName: "frontend-a-nomad",
            appId: '9N9PY13ZHL'
        },
        nav: [{
                text: 'Get Start',
                link: '/css/intro'
            },
            {
                text: 'Books',
                items: [{
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
                title: 'HTML5/CSS3',
                collapsable: false,
                children: [
                    '/css/intro',
                    '/css/css3',
                    '/css/mobile'
                ]
            },
            {
                title: 'JavaScript',
                collapsable: false,
                children: [
                    '/js/es',
                    '/js/webapi'
                ]
            },
        ],
        sidebarDepth:3,
        displayAllHeaders: true,
        lastUpdated: '更新时间',
    },
    markdown: {
        lineNumbers: true
    }
}
