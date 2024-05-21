window.addEventListener('DOMContentLoaded', () => {
    ((doc) => {
        var searchBox = doc.getElementById('J_searchBox');

        const init = () => {
            bindEvent();
        }

        const bindEvent = () => {   
            searchBox.addEventListener('click', searchBoxClick, false);
        }

        const searchBoxClick = () => {
            window.location.href = '/search/searchPage.html';
        }

        init();
    })(document)
})