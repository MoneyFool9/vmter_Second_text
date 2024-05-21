window.addEventListener('DOMContentLoaded', () => {
    ((doc) => {
        var userInfoBox = doc.getElementById('J_userInfoBox'),
            userInfoCon = doc.getElementById('userInfo').innerHTML,
            userBookList = doc.getElementById('J_bookList'),
            userBookListCon = doc.getElementById('userBookList').innerHTML,
            goBackBtn = doc.getElementById('J_goBackBtn'),
            loginOutBtn;

        const init = () => {
            checkToken();
            render();
            setTimeout(() => {
                loginOutBtn = doc.getElementById('J_loginOutBtn');
                bindEvent();
            }, 2000)
        }

        const bindEvent = () => {
            loginOutBtn.addEventListener('click', logOutBtnClick, false);
            goBackBtn.addEventListener('click', goBackBtnClick, false);
        }

        const goBackBtnClick = () => {
            window.history.back();
        }

        const logOutBtnClick = () => {
            ajax({
                url: 'https://www.batstroke.top/user/logOut',
                headers: {
                    accessToken: getToken()
                },
                success: (res) => {
                    if (res.code === '200') {
                        alert(res.data);
                        removeToken();
                        window.location.href = '../login/My.html';
                    } else {
                        alert(res.msg);
                    }
                }
            })
        }

        const render = () => {
            if (getToken() !== null) {
                userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

                if (userInfo) {
                    userInfoBox.innerHTML = userInfoCon.replace(/{{(.*?)}}/g, (node, key) => {
                        return {
                            userName: userInfo.userName || '用户5201314',
                            userImg: userInfo.avatar || '../images/userImg.jpg',
                            readBookNum: userInfo.readBookNum || '0',
                            readTime: userInfo.readTime || '0小时0分',
                            introduction: userInfo.introduction || '这个人很懒，什么都没留下'
                        }[key.trim()]
                    })
                }
            }
        }
        const checkToken = () => {
            if (getToken() === null) {
                alert('您还未登录，登录享受更多权益！')
                window.location.href = '../login/login.html';
            }
        }



        init();
    })(document)
})