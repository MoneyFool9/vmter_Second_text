window.addEventListener('DOMContentLoaded', () => {
    const registerAction = ((doc) => {
        var oUsername = doc.getElementById('J_username'),
            oPassword = doc.getElementById('J_password'),
            oIsAgree = doc.getElementById('J_isAgree'),
            clearUserNameInput = doc.getElementsByClassName('J_clearInput')[0],
            clearPassWordInput = doc.getElementsByClassName('J_clearInput')[1],
            hidePw = doc.getElementsByClassName('J_hidePw')[0],
            showPw = doc.getElementsByClassName('J_showPw')[0];

        return {
            register: function (e) {
                e.preventDefault();

                var username = trimSpace(oUsername.value),
                    password = trimSpace(oPassword.value),
                    isAgree = oIsAgree.checked;

                if (username.length < 6 || username.length > 20) {
                    alert ('用户名长度：6-20位');
                    return;
                }
                if (password.length < 6 || password.length > 20) {
                    alert ('密码长度：6-20位');
                    return;
                }
                if (!isAgree) {
                    alert ('请阅读并同意番茄小说用户协议');
                    return;
                }
                this.submitForm(username, password);
            },
            submitForm: (username, password) => {
                ajax({
                    method: 'POST',
                    url: 'https://www.batstroke.top/user/registe',
                    data: {
                        userName: username,
                        password: password
                    },
                    success(res) {
                        if (res.code === '200') {
                            alert('注册成功');
                            window.location.href = '/login/login.html'
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
                oUsername.addEventListener('input', registerAction.inputIng, false);
                oPassword.addEventListener('input', registerAction.inputIng, false);
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
        var registerBtn = doc.getElementsByClassName('J_signUpBtn')[0],
            goBackBtn = doc.getElementById('J_goBack');

        const init = () => {
            bindEvent();
            registerAction.checkInput();
        }

        const bindEvent = () => {
            registerAction.clearInputEvent();
            registerAction.pwdToggleEvent();
            registerBtn.addEventListener('click', registerAction.register.bind(registerAction), false);
            goBackBtn.addEventListener('click', goBackBtnClick, false);
        }

        const goBackBtnClick = () => { 
            window.history.back();
        }

        init();
    })(document)
})