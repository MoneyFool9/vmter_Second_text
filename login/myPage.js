window.addEventListener('DOMContentLoaded', () => {
    ((doc) => {
        var userNameBox = doc.getElementById('J_userNameBox'),
            loginBox = doc.getElementsByClassName('J_loginBox')[0];


        const autoUpdateToken = (callback) => {
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

        const init = () => {
            bindEvent();
            // autoUpdateToken(() => {
            //     setTimeout(() => {
            //         removeToken();
            //     }, 10000)
            // });
            checkLoginStatus();

        }

        const bindEvent = () => {
            loginBox.addEventListener('click', loginBoxClick, false);
        }

        const loginBoxClick = () => {
            if (userNameBox.innerText === '点击登录/注册') {
                window.location.href = './login.html';
            } else {
                window.location.href = '../user/user.html';
            }
        }

        const checkLoginStatus = () => {
            if (getToken() === null) {
                alert('登录已失效，请重新登录')
                window.location.href = './login.html';
            } else {
                userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

                if (userInfo.userName) {
                    userNameBox.innerText = userInfo.userName;
                } else {
                    userNameBox.innerText = '用户5201314';
                }
            }
        }

        init();
    })(document)
})