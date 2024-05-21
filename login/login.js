window.addEventListener('DOMContentLoaded', () => {
    const loginAction = ((doc) => {
        var oUsername = doc.getElementById('J_loginUsername'),
            oPassword = doc.getElementById('J_loginPassword'),
            oIsAgree = doc.getElementById('J_isAgree'),
            clearUserNameInput = doc.getElementById('J_clearUsernameInput'),
            clearPassWordInput = doc.getElementById('J_clearPasswordInput'),
            hidePw = doc.getElementById('J_hidePw'),
            showPw = doc.getElementById('J_showPw');

        return {
            loginOut: async function () {

                await ajax({
                    method: 'POST',
                    url: 'https://www.batstroke.top/test/logOut',
                    contentType: 'application/json',
                    data: {
                        username: "moneyfool",
                        password: "123456"
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
                await ajax({
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
            },
            checkToken: () => {
                if (getToken() !== null) {
                    alert('您已经登录，可享受更好的体验！')
                    window.location.href = '/index.html';
                }
            },
            login: function (e) {
                e.preventDefault();

                var username = trimSpace(oUsername.value),
                    password = trimSpace(oPassword.value),
                    isAgree = oIsAgree.checked;

                if (username.length < 6 || username.length > 20) {
                    alert('用户名长度：6-20位');
                    return;
                }
                if (password.length < 6 || password.length > 20) {
                    alert('密码长度：6-20位');
                    return;
                }
                if (!isAgree) {
                    alert('请阅读并同意番茄小说用户协议');
                    return;
                }
                this.submitForm(username, password);
            },
            submitForm: (username, password) => {
                ajax({
                    method: 'POST',
                    url: 'https://www.batstroke.top/user/login',
                    contentType: 'application/json',
                    data: {
                        username: username,
                        password: password
                    },
                    success(res) {

                        console.log('res =>', res);
                        if (res.code === '200') {
                            alert('登录成功');
                            saveToken(res.data.accessToken, res.data.refreshToken);
                            window.location.href = '/login/My.html';
                        } else {
                            alert(res.msg);
                        }

                    },
                    error(code, txt) {
                        console.log('请求失败，状态码为：', code, txt);
                    }
                })
            },
            checkInput: () => {
                oUsername.addEventListener('input', loginAction.inputIng, false);
                oPassword.addEventListener('input', loginAction.inputIng, false);
            },
            inputIng: () => {
                if (oUsername.value) {
                    clearUserNameInput.style.display = 'block';
                } else {
                    clearUserNameInput.style.display = 'none';
                }

                if (oPassword.value) {
                    clearPassWordInput.style.display = 'block';
                    hidePw.style.display = 'block';
                } else {
                    clearPassWordInput.style.display = 'none';
                    hidePw.style.display = 'none';
                }
            },
            clearInputEvent: () => {
                clearUserNameInput.addEventListener('click', () => {
                    oUsername.value = '';
                    clearUserNameInput.style.display = 'none';
                }, false);
                clearPassWordInput.addEventListener('click', () => {
                    oPassword.value = '';
                    clearPassWordInput.style.display = 'none';
                    hidePw.style.display = 'none';
                    showPw.style.display = 'none';
                }, false);
            },
            pwdToggleEvent: () => {
                hidePw.addEventListener('click', () => {
                    hidePw.style.display = 'none';
                    showPw.style.display = 'block';
                    oPassword.type = 'text';
                }, false);
                showPw.addEventListener('click', () => {
                    hidePw.style.display = 'block';
                    showPw.style.display = 'none';
                    oPassword.type = 'password';
                }, false);
            }
        }
    })(document)

    ; ((doc) => {
        var loginBtn = doc.getElementById('J_loginBtn'),
            goBackBtn = doc.getElementById('J_goBack'),
            helpBtn = doc.getElementById('J_help');


        const init = () => {
            bindEvent();
            loginAction.checkInput();
            loginAction.checkToken();
        }

        const bindEvent = () => {
            loginAction.clearInputEvent();
            loginAction.pwdToggleEvent();
            loginBtn.addEventListener("click", loginAction.login.bind(loginAction), false);
            goBackBtn.addEventListener('click', goBackBtnClick, false);
            helpBtn.addEventListener("click", helpBtnClick, false);
        }

        const goBackBtnClick = () => {
            window.history.back();
        }

        const helpBtnClick = () => {
            loginAction.loginOut();
        }

        
        init();
    })(document)
})