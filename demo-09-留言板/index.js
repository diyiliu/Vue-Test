const app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        list: []
    },
    methods: {
        handleSend: function () {
            if (this.username === ''){
                window.alert('请输入昵称');
                return;
            }

            if (this.message === '') {
                window.alert('请输入留言内容');
                return;
            }

            this.list.push({
               name: this.username,
               message: this.message
            });
            this.username = '';
            this.message = '';
        },
        handleReply: function (index) {
            let name = this.list[index].name;
            this.username = '';
            this.message = '回复@' + name + ': ';
            this.$refs.user.focus();
        }
    }
});