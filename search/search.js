window.addEventListener('DOMContentLoaded', () => {
    ((doc) => {
        var searchBtn = doc.getElementById('J_searchBtn'),
            bookTypeList = doc.getElementById('J_bookType').innerHTML,
            bookList = doc.getElementById('J_bookList');

        var API = {
            getBookType: 'https://www.batstroke.top/book/getBookType',
            getBookMenuByType: 'https://www.batstroke.top/book/getBookMenuByType'
        }

        var type = [],
            data = {};

        const init = () => {
            bindEvent();
            getBookType();
        }

        const bindEvent = () => {
            searchBtn.addEventListener('click', searchBtnClick, false);
        }

        const searchBtnClick = () => {
            window.location.href = '/search/searchPage.html';
        }

        const getBookType = () => {
            ajax({
                url: API.getBookType,
                headers: {
                    accessToken: getToken()
                },
                success: (res) => {
                    if (res.code === "200") {
                        console.log('res=>', res);
                        _setBookTypeData(res.data);
                    } else {
                        alert('无匹配书籍资源！');
                    }
                }
            })
        }

        const _setBookTypeData = (res) => {
            bookList.innerHTML += renderBookTypeList(res);
        }

        const renderBookTypeList = (res) => {
            var list = '',
                type,
                typeContent = '';
            for (let key in res) {
                typeContent = '';
                type = key;
                res[key].forEach((elem) => {
                    typeContent += `<li>${elem}</li>`;
                })

                list += bookTypeList.replace(/{{(.*?)}}/g, (node, key) => {
                    return {
                        type: type,
                        typeContent: typeContent
                    }[key.trim()];
                })

            }
            return list;
        }
       
        init();
    })(document)

})
const bookTypeClick = (e) => {
    tar = e.target;
    keyword = e.target.innerText;

    window.location.href = `./searchPage.html?keyword=${keyword}`;
    console.log(keyword);
    
}