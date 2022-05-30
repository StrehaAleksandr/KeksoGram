'use strict';

(function() {
    var DEBOUNCE_INTERVAL = 500;

    var lastTimeout;
    
    function isEscape(evt, callback) {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            callback();
        }
    }

    function isEnter(evt, callback) {
        if (evt.key === 'Enter') {
            callback();
        }
    }

    function debouce(evt, fun) {
        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(function() {
            fun(evt);
        }, DEBOUNCE_INTERVAL)
    }

    window.util = {
        isEscape: isEscape,
        isEnter: isEnter,
        debouce: debouce
    };
})();