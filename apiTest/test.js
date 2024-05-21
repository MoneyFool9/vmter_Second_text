document.addEventListener('DOMContentLoaded', () => {
    var Logout = document.getElementById('Logout');
    var login = document.getElementById('login');
    var logOut = document.getElementById('logOut');
    var signUp = document.getElementById('signUp');
    var updateToken = document.getElementById('updateToken');
    var getInfo = document.getElementById('getInfo');
    var getUserInfo = document.getElementById('getUserInfo');

    autoUpdateToken(function () {
        setTimeout(function () {
            removeToken();
        }, 10000)
    });

    Logout.onclick = function () {
        ajax({
            url: 'https://www.batstroke.top/user/logOut',
            headers: {
                accessToken: getToken()
            },
            success(res) {
                console.log('res =>', res);
                if (res) {
                    if (res.code === '200') {
                        console.log('登出成功');
                        removeToken()
                    } else {
                        console.log('登出失败');
                    }
                } else {
                    console.log('你的登录凭证已经过期，请重新登录');
                }


            },
            error(code, txt) {
                console.log('请求失败，状态码为：', code, txt);
            }
        })
    }
    logOut.onclick = function () {
        ajax({
            method: 'POST',
            url: 'https://www.batstroke.top/test/logOut',
            contentType: 'application/json',
            data: {
                username: 'fool',
                password: 'Hao123456'
            },
            success(res) {

                console.log('res =>', res);
                if (res.code === '200') {
                    console.log('登出成功');
                    saveToken(res.data);
                } else {
                    console.log('登出失败');
                }

            },
            error(code, txt) {
                console.log('请求失败，状态码为：', code, txt);
            }
        })
    }
    signUp.onclick = function () {
        ajax({
            method: 'POST',
            url: 'https://www.batstroke.top/user/registe?userName&password',
            data: {
                userName: 'fool',
                password: 'Hao123456'
            },
            success(res) {
                console.log('res =>', res);
                if (res.code === '200') {
                    console.log('注册成功');
                } else {
                    console.log('注册失败');
                }

            },
            error(code, txt) {
                console.log('请求失败，状态码为：', code, txt);
            }
        })

    }
    login.onclick = function () {
        ajax({
            method: 'POST',
            url: 'https://www.batstroke.top/user/login',
            contentType: 'application/json',
            data: {
                username: 'fool',
                password: 'Hao123456'
            },
            success(res) {

                console.log('res =>', res);
                if (res.code === '200') {
                    console.log('登录成功');
                    saveToken(res.data.accessToken, res.data.refreshToken);
                    setTimeout(function () {
                        removeToken();
                    }, 10000)
                } else {
                    console.log('登录失败');
                }

            },
            error(code, txt) {
                console.log('请求失败，状态码为：', code, txt);
            }
        })
    }
    updateToken.onclick = function () {
        ajax({
            url: 'https://www.batstroke.top/user/refresh',
            headers: {
                refreshToken: getRefreshToken()
            },
            success(res) {
                console.log('res =>'.res);
                if (res.code === '200') {
                    console.log('更新成功');
                    saveToken(res.data.accessToken, res.data.refreshToken);
                } else {
                    console.log('更新失败');
                }
            }
        })
    }
    getInfo.onclick = function () {
        ajax({
            url: 'https://www.batstroke.top/book/getBooksBySearch?search',
            headers: {
                accessToken: getToken()
            },
            success(res) {
                console.log('res =>', res);
                if (res.code === '200') {
                    console.log('获取书籍信息成功');
                    console.log(res.data);
                    var coverSet = [];
                    for (let item of res.data) {
                        coverSet.push(item.cover);
                        // var cover = arrayBufferToBase64(item.cover);
                        // coverSet.push(cover);
                        // console.log(cover);
                    }
                    console.log(coverSet);
                } else {
                    console.log('获取书籍信息失败');
                }
            },
            error(code, txt) {
                console.log('请求失败，状态码为：', code, txt);
            }
        })
    }
    getUserInfo.onclick = function () {
        ajax({
            url: 'https://www.batstroke.top/user/getUserInfo',
            headers: {
                accessToken: getToken()
            },
            data: {
                type: ''
            },
            success(res) {
                console.log('res =>', res);
                if (res.code === '200') {
                    console.log('获取信息成功');
                    window.localStorage.setItem('userInfo', JSON.stringify(res.data));
                } else {
                    console.log('获取信息失败');
                }
            },
            error(code, txt) {
                console.log('请求失败，状态码为：', code, txt);
            }
        })
    }


    function autoUpdateToken(callback) {
        if (getToken() === null) {
            ajax({
                url: 'https://www.batstroke.top/user/refresh',
                headers: {
                    refreshToken: getRefreshToken()
                },
                success(res) {
                    console.log('res =>'.res);
                    if (res.code === '200') {
                        console.log('更新成功');
                        var refreshToken = res.data.accessToken + '[]';
                        saveToken(res.data.accessToken, refreshToken);
                    } else {
                        console.log('更新失败');
                    }
                }
            })
        }
        callback && callback();
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

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
})
