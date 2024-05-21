window.addEventListener('DOMContentLoaded', () => {
    const commentAction = ((doc) => {
        var commentBroad = doc.getElementsByClassName('J_commentEditBoard')[0],
            editTxt = doc.getElementsByClassName('J_editTxt')[0],
            txtCount = doc.getElementsByClassName('J_txtCount')[0];


        return {
            openCmtBroad: () => {
                commentBroad.style.display = 'block';
            },
            closeCmtBroad: () => {
                commentBroad.style.display = 'none';
            },

            submitComment: () => {
                const val = trimSpace(editTxt.value);
                const bookId = getUrlQueryValue('bookId');

                ajax({
                    url: 'https://www.batstroke.top/comment/postComment',
                    method: 'POST',
                    headers: {
                        accessToken: getToken()
                    },
                    contentType: 'application/json',
                    data: {
                        bookId: bookId,
                        text: val
                    },
                    success(res) {
                        if (res.code = '200') {
                            alert(res.data);
                            window.location.reload();
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            },
            checkedInput: () => {
                var val = editTxt.value,
                    valLen = val.length;

                txtCount.innerHTML = valLen;

            },
            submitBtnStatusChange: () => {

            }
        }
    })(document)


        ; ((doc) => {
            var Wrapper = doc.getElementById('J_bookDetailWrapper'),
                bookInfo = doc.getElementById('J_bookInfo').innerHTML,
                closeBtn = doc.getElementsByClassName('J_closeBtn')[0],
                editTxt = doc.getElementsByClassName('J_editTxt')[0],
                submitBtn = doc.getElementsByClassName('J_submitBtn')[0]

            var commentList,
                commentTpl,
                doComment;

            const init = () => {
                loadingBookDetail();
                setTimeout(() => {
                    commentList = doc.getElementsByClassName('J_commentList')[0];
                    commentTpl = doc.getElementById('J_commentTpl').innerHTML;
                    doComment = doc.getElementsByClassName('J_doComment')[0];
                    bindEvent();
                    getBookComment();
                }, 3000)

            }

            const bindEvent = () => {
                doComment.addEventListener('click', commentAction.openCmtBroad, false);
                closeBtn.addEventListener('click', commentAction.closeCmtBroad, false);
                editTxt.addEventListener('input', commentAction.checkedInput, false);
                submitBtn.addEventListener('click', commentAction.submitComment, false);
            }


            const loadingBookDetail = (callback) => {
                const bookId = getUrlQueryValue('bookId');
                if (bookId) {
                    getBookDetail(bookId);
                }
                callback && callback();

            }

            const getBookDetail = (bookId) => {
                ajax({
                    url: 'https://www.batstroke.top/book/getBookMsgById',
                    headers: {
                        accessToken: getToken()
                    },
                    data: {
                        bookId: bookId
                    },
                    success: (res) => {
                        if (res.code === "200") {
                            console.log('res =>', res);
                            _setBookDetail(res.data);
                        }
                    }
                })
            }

            const _setBookDetail = (res) => {
                Wrapper.innerHTML = bookInfo.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        point: res.point,
                        name: res.name,
                        author: res.author,
                        label: res.label,
                        introduction: res.introduction,
                        postedTime: res.postedTime
                    }[key.trim()];
                });
            }

            const getBookComment = () => {
                const bookId = getUrlQueryValue('bookId');
                ajax({
                    url: 'https://www.batstroke.top/comment/getCommentsByBookId',
                    headers: {
                        accessToken: getToken()
                    },
                    data: {
                        bookId: bookId
                    },
                    success: (res) => {
                        if (res.code === "200") {
                            console.log('res =>', res);
                            _setBookComment(res.data);
                        } else {
                            console.log('获取书籍评论失败');
                        }
                    }
                })
            }

            const _setBookComment = (data) => {
                commentList.innerHTML = renderBookCmtList(data);
            }

            const renderBookCmtList = (data) => {
                const nowTime = new Date().getTime();
                const nowTimeDate = getDateTime(nowTime);

                var list = '';

                data.forEach((elem) => {
                    list += commentTpl.replace(/{{(.*?)}}/g, (node, key) => {
                        return {
                            data: elem.data,
                            nowTimeDate: nowTimeDate,
                            commentId: elem.commentId
                        }[key.trim()];
                    })
                })
                return list;
            }



            init();
        })(document)
})
const deleteComment = (e) => {
    tar = e.target.parentNode;

    const commentId = tar.getAttribute('data-commentid');
    
    ajax({
        url: 'https://www.batstroke.top/comment/delComment',
        headers: {
            accessToken: getToken()
        },
        method: 'POST',
        data: {
            commentId: commentId
        },
        success: (res) => {
            if (res.code === '200') {
                tar.parentNode.removeChild(tar);
            } else {
                alert(res.msg);
            }
        }
    })
}