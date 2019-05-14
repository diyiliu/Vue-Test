const app = new Vue({
    el: '#app',
    data: {
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                key: 'age',
                sortable: true
            },
            {
                title: '出生日期',
                key: 'birthday',
                sortable: true
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data: [
            {
                name: '王小明',
                age: 18,
                birthday: '1999-03-11',
                address: '北京市朝阳区芍药居'
            },
            {
                name: '张小刚',
                age: 25,
                birthday: '1992-03-11',
                address: '北京市海淀区西二旗'
            },
            {
                name: '李小红',
                age: 30,
                birthday: '1987-03-11',
                address: '上海市浦东区新区世纪大道'
            },
            {
                name: '周小伟',
                age: 26,
                birthday: '1991-03-11',
                address: '深证市南山区深南大道'
            }
        ]
    }
});