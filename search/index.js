window.addEventListener('DOMContentLoaded', () => {
    ((doc) => {
        var searchConBox = doc.getElementsByClassName('J_searConBox')[0].querySelector('ul'),
            searchCon = doc.getElementById('J_searchCon').innerHTML,
            goBackBtn = doc.getElementsByClassName('J_goBackBtn')[0],
            searchBtn = doc.getElementsByClassName('J_searchBtn')[0],
            searchInput = doc.getElementById('J_searchInput'),
            loadingTpl = doc.getElementById('J_loadingTpl').innerHTML;

        var keyword = '';

        const init = () => {
            bindEvent();
            checkedURl();
        }

        const bindEvent = () => {
            goBackBtn.addEventListener('click', goBackBtnClick, false);
            searchBtn.addEventListener('click', searchBtnClick, false);
            searchInput.addEventListener('keyup', searchInputKeyUp, false);
            searchInput.addEventListener('input', searchInputIng, false);
            searchConBox.addEventListener('click', searchConBoxClickToInfo, false);
        }

        const searchConBoxClickToInfo = (e) => {
            var tar = e.target,
                bookId = 1;

            if (getItemNode(tar) !== undefined) {
                const Item = getItemNode(tar);
                bookId = Item.getAttribute('data-bookid');
                window.location.href = '/book/reading.html?bookId=' + bookId;
            }

        }

        const searchInputIng = () => {
            searchConBox.innerHTML = '';
        }

        const searchInputKeyUp = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                searchBtnClick();
            }
        }

        const goBackBtnClick = () => {
            window.history.back();
        }

        const searchBtnClick = () => {
            keyword = searchInput.value;
            if (keyword) {
                searchConBox.innerHTML = loadingTpl;
                getSearchCon(keyword);
            } else {
                alert('请输入关键词！');
            }
        }

        const renderSearchCon = (data) => {
            var list = '';
            data.forEach((elem) => {
                list += searchCon.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        bookId: elem.bookId,
                        point: elem.point,
                        name: elem.name,
                        author: elem.author,
                        label: elem.label,
                        introduction: elem.introduction,
                        postedTime: elem.postedTime
                    }[key.trim()];
                })
            })
            return list;
        }
        const getSearchCon = (keyword) => {
            ajax({
                url: 'https://www.batstroke.top/book/getBooksBySearch',
                headers: {
                    accessToken: getToken()
                },
                data: {
                    search: keyword
                },
                success: (res) => {
                    if (res.code === "200") {
                        console.log('res=>', res);
                        _setSearchConData(res.data);
                    } else {
                        alert('无匹配书籍资源！');
                    }
                }
            })
        }

        const _setSearchConData = (res) => {
            searchConBox.innerHTML = renderSearchCon(res);
        }

        const getItemNode = (target) => {

            if (target.nodeName.toLowerCase() === 'ul') {
                return;
            }
            while (target = target.parentNode) {
                if (target.nodeName.toLowerCase() === 'li') {
                    return target;
                }
            }
        }

        const checkedURl = () => {
            if (getUrlQueryValue('keyword')) {
                var URLkeyword = getUrlQueryValue('keyword');
                
                searchInput.value = URLkeyword;
                searchBtnClick();
            }
        }

        init();
    })(document)
})