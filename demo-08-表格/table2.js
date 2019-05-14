Vue.component('vTable', {
    template: '<table>' +
        '<thead>' +
        '<tr><th v-for="(item, index) in currentColumns">' +
        '<span>{{item.title}}</span>' +
        '<template v-if="item.sortable">' +
        '<a :class="{on: item._sortType === \'asc\'}" @click="handleSortByAsc(index)">↑</a>' +
        '<a :class="{on: item._sortType === \'desc\'}" @click="handleSortByDesc(index)">↓</a>' +
        '</template></th></tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr v-for="(row, index) in currentData">' +
        '<td v-for="(item, index) in currentColumns">{{row[item.key]}}</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>',
    props:
        {
            columns: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                col._sortType = 'normal';
                col._index = index;
                return col;
            });
        },
        makeData: function () {
            this.currentData = this.data.map(function (row, index) {
                row._index = index;
                return row;
            });
        },
        handleSortByAsc: function (index) {
            let key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';

            this.currentData.sort(function (a, b) {
                return a[key] > b[key] ? 1 : -1;
            });
        },
        handleSortByDesc: function (index) {
            let key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';

            this.currentData.sort(function (a, b) {
                return a[key] < b[key] ? 1 : -1;
            });
        }
    },
    watch: {
        data: function () {
            this.makeData();
            let sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal';
            });

            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    mounted() {
        this.makeColumns();
        this.makeData();
    }
});