function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();   //逻辑运算符
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);
}

function getUrlQueryValue(key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    const res = window.location.search.substring(1).match(reg);

    return res !== null ? decodeURIComponent(res[2]) : null;
}

function throttle(fn, delay) {
    var t = null,
        begin = new Date().getTime();

    return function () {
        var _self = this,
            args = arguments,
            cur = new Date().getTime();

        clearTimeout(t);

        if (cur - begin >= delay) {
            fn.apply(_self, args);
            begin = cur;
        } else {
            t = setTimeout(function () {
                fn.apply(_self, args);
            }, delay);
        }
    }
}

function stopPropagation(event) {
    event.stopPropagation();
}

function trimSpace(str) {
    return str.replace(/\s+/gim, '');
}

function saveToken(token, refreshToken) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
}
function getToken() {
    return localStorage.getItem('accessToken');
}
function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}
function removeToken() {
    localStorage.removeItem('accessToken');
}


function getDateTime(ts, type) {

    var dt = new Date(ts),
        y = dt.getFullYear(),
        m = addZero(dt.getMonth() + 1),
        d = addZero(dt.getDate()),
        h = addZero(dt.getHours()),
        i = addZero(dt.getMinutes()),
        s = addZero(dt.getSeconds());

    switch (type) {
        case 'date':
            return y + '-' + m + '-' + d;
            break;
        case 'time':
            return h + ':' + i + ':' + s;
            break;
        case 'dateTime':
            return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
            break;
        default:
            return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
    }

    function addZero(num) {
        return num < 10 ? ('0' + num) : num;
    }
}
