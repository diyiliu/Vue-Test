Vue.component('vInput', {
    render: function (h) {
        let _this = this;
        return h('div', [
            h('span', '昵称: '),
            h('input', {
                attrs: {
                    type: 'text'
                },
                domProps: {
                    value: this.value
                },
                ref: 'user',
                on: {
                    input: function (event) {
                        _this.val = event.target.value;
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data: function () {
        return {
            val: this.value
        }
    },
    methods: {
        focus: function () {
            this.$refs.user.focus();
        }
    }
});

Vue.component('vTextarea', {
    render: function (h) {
        let _this = this;
        return h('div', [
            h('span', '留言内容: '),
            h('textarea', {
                attrs: {
                    placeholder: '请输入留言内容'
                },
                domProps: {
                    value: this.value
                },
                ref: 'message',
                on: {
                    input: function (event) {
                        _this.val = event.target.value;
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            val: this.value
        }
    },
    methods: {
        focus: function () {
            this.$refs.message.focus();
        }
    }
});