'use strict';

(function() {
    function getData(onLoad, onError) {
        var URL = 'https://22.javascript.pages.academy/kekstagram/data';
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.open('GET', URL);

        xhr.addEventListener('load', function() {
            onLoad(xhr.response);
        });

        xhr.send();
    }

    // function postData(data, onLoad, onError) {
    //     var URL = 'https://22.javascript.pages.academy/kekstagram';
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'json';

    //     xhr.addEventListener('load', function() {
    //         onLoad(xhr.response);
    //         if (!onLoad(xhr.response)) {
    //             onError();
    //         }

    //         xhr.open('POST', URL);
    //         xhr.send(data);
    //     })
    // }

    function postData(data, onLoad) {
        var URL = 'https://22.javascript.pages.academy/kekstagram';
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            onLoad(xhr.response);

            xhr.open('POST', URL);
            xhr.send(data);
        })
    }

    window.backend = {
        getData: getData,
        postData: postData
    }
})();