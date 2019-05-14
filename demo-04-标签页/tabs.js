Vue.component('tabs', {
    template: '<div class="tabs">' +
        '<div class="tabs-bar">' +
        '<div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">{{item.label}}</div>' +
        '</div>' +
        '<div class="tabs-content">' +
        '<slot></slot>' +
        '</div>' +
        '</div>',
    props: {
        // 这里的 value 是为了可以使用 v-model
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            // 因为不能修改 value, 所以复制一份自己维护
            currentValue: this.value,
            // 用于渲染 tabs 标题
            navList: []
        }
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab',
                {
                    // 给当前选中的 tab 加个 class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        handleChange(index){
            let nav = this.navList[index];
            let name = nav.name;
            this.currentValue = name;
            // 更新 value
            this.$emit('input', name);
            // 触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
        getTabs() {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane'
            });
        },
        updateNav() {
            this.navList = [];
            let _this = this;

            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                // 如果没有给 pane 设置 name, 默认设置它的索引
                if (!pane.name) {
                    pane.name = index;
                }
                // 设置当前选中的 tab 的索引
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });

            this.updateStatus();
        },
        updateStatus() {
            let tabs = this.getTabs();
            let _this = this;
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        }
    },
    watch: {
        value: function (value) {
            this.currentValue = value;
        },
        currentValue: function () {
            // 在当前选中的 tab 发生变化时，更新 pane 的显示状态
            this.updateStatus();
        }
    }
});