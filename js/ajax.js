//封装一个参数处理函数
function resolveData(data) {
    var arr = [];
    for (var key in data) {
        arr.push(key + '=' + data[key]);  //键值对
    }
    return arr.join('&');  //字符串
}
//封装网络请求函数，要求传入一个对象参数
// 参数样例{
//     url: 请求地址
//     method: 请求方式
//     headers: 设置请求头
//     data: 请求参数
//     contentType: 请求头内容类型
//     async: 同步异步参数
//     dataType: 定义响应数据类型
//     beforeSend: 发送请求前的准备
//     progress: 上传进度
//     complete: 加载完成的回调
//     success: 成功回调
//     error: 失败回调
//     timeout: 超时时间
//     timeoutCallback: 超时回调
// }
function ajax(options) {
    options = Object.assign({
        url: location.href,
        method: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        async: true,
        dataType: 'json',
        success: () => { },
        error: () => { },
        complete: () => { },
    }, options)


    var xhr = new XMLHttpRequest();   //初始化XML对象

    options.async && (xhr.responseType = options.dataType);

    xhr.onloadstart = options.beforeSend;
    xhr.onprogress = options.progress;
    xhr.onloadend = () => options.complete(xhr);
    xhr.onload = () => options.success(xhr.response);
    xhr.onerror = () => options.error(xhr.status, xhr.statusText);

    if (options.timeout) {
        xhr.timeout = options.timeout;
        xhr.ontimeout = options.timeoutCallback;
    }

    var data = resolveData(options.data);  //处理参数
    if (options.method.toUpperCase() === 'GET') {  //判断请求类型
        xhr.open(options.method, options.url + (options.data ? '?' + data : ''), options.async); //传入url参数
        if (options.headers) {
            for (var i in options.headers) {
                xhr.setRequestHeader(i, options.headers[i]);  //设置请求头
            }
        }
    } else if (options.method.toUpperCase() === 'POST') {
        xhr.open(options.method, options.url, options.async);
        xhr.setRequestHeader('Content-Type', options.contentType);
        
        if (options.headers) {
            for (var i in options.headers) {
                xhr.setRequestHeader(i, options.headers[i]);  //设置请求头
            }
        }
    }
    if (/x-www-form-urlencoded/.test(options.contentType)) {
        xhr.send(data);
    } else if (/json/.test(options.contentType)) {
        xhr.send(JSON.stringify(options.data)); //传入参数发送请求
    } else {
        xhr.send(options.data);
    }
}