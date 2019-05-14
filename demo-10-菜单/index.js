const app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                path: '/admin/home',
                name: '我的首页',
                icon: 'icon-home'
            },
            {
                path: '/admin/other',
                name: '我的应用',
                icon: 'icon-lock'
            },
            {
                name: '我的信息',
                icon: 'fa fa-user',
                children: [
                    {
                        path: '/admin/menu1',
                        name: '基本信息',
                        icon: 'fa fa-info-circle'
                    },
                    {
                        path: '/admin/menu2',
                        name: '我的文档',
                        icon: 'icon-settings'
                    }
                ]
            },
            {
                name: '系统管理',
                icon: 'fa fa-config',
                children: [
                    {
                        path: '/admin/menu3',
                        name: '用户管理',
                        icon: 'fa fa-user'
                    }
                ]
            }
        ]
    }
});