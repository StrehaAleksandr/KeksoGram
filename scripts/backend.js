'use strict';

(function() {
    function getData(onLoad, onError) {
        var URL = 'https://22.javascript.pages.academy/kekstagram/data';
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.open('GET', URL);

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            }
            else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
              }
        });

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });
          xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.send();
    }

    function postData(data, onLoad, onError) {
        var URL = 'https://22.javascript.pages.academy/kekstagram';
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            }
            else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }

            xhr.open('POST', URL);
            xhr.send(data);
        });

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });
          xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });
    }

    window.backend = {
        getData: getData,
        postData: postData
    }
})();