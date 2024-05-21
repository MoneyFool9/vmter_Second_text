window.addEventListener('DOMContentLoaded', () => {
    ; (function (doc) {

        var oItems = doc.getElementsByClassName('J_bookItem'),
            oItemsLen = oItems.length,
            _arr = [];

        var init = function () {
            setImgPos();
        }

        function setImgPos() {
            var item;

            for (var i = 0; i < oItemsLen; i++) {
                item = oItems[i];
                item.style.width = '187px';  //wrap --width /2 - gap

                if (i < 2) {
                    _arr.push(item.offsetHeight);
                    item.style.top = '0';

                    if ((i + 1) % 2 === 1) {
                        item.style.left = '0';
                    } else {
                        item.style.left = i * (187 + 10) + 'px';
                    }
                } else {
                    minIdx = getMinIdx(_arr);
                    item.style.left = oItems[minIdx].offsetLeft + 'px';
                    item.style.top = (_arr[minIdx] + 10) + 'px';
                    _arr[minIdx] += (item.offsetHeight + 10);
                }
            }
        }

        function getMinIdx(arr) {
            return [].indexOf.call(arr, Math.min.apply(null, arr));
        }

        init();

    })(document);
})