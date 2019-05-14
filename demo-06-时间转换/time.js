/*
分析一下时间转换的逻辑：
•l分钟以前，显示“刚刚”。
•1分钟～1小时之间，显示“xx分钟前”。
•1小时～l天之间，显示“xx小时前”。
•l天～1个月01天）之间，显示“xx天前”。
•大于1个月，显示“xx年xx月xx曰。
*/
Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        el._timeout_ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 5000);
    },
    unbind: function (el) {
        clearInterval(el._timeout_);
        delete  el._timeout_;
    }
});

const Time = {
    // 获取当前时间戳
    getUnix: function () {
        let date = new Date();
        return date.getTime();
    },
    // 获取今天 0 时 0 分 0 秒的时间戳
    getTodayUnix: function () {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年 1 月 1 日 0 时 0 分 0 秒的时间戳
    getYearUnix: function () {
        let date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准时间年月日
    getLastDate: function (time) {
        let date = new Date(time);
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    // 转换时间
    getFormatTime: function (timestamp) {
        let now = this.getUnix();
        let today = this.getTodayUnix();
        let year = this.getYearUnix();

        let timer = (now - timestamp) / 1000;
        let tip = '';

        if (timer == 0 || Math.floor(timer / 60) <= 0) {
            tip = '刚刚'
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timestamp - today >= 0)) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31 && timestamp > year) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }

        return tip;
    }
}