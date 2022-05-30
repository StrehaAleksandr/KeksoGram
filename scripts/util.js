'use strict';

(function() {
    var DEBOUNCE_INTERVAL = 500;

    var lastTimeout;
    
    function isEscape(evt, callback1, callback2) {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            callback1();
            callback2();
        }
    }

    function isEnter(evt, callback1, callback2) {
        if (evt.key === 'Enter') {
            callback1();
            callback2();
        }
    }

    function debouce(fun) {
        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(function() {
            fun();
        }, DEBOUNCE_INTERVAL)
    }

    window.util = {
        isEscape: isEscape,
        isEnter: isEnter,
        debouce: debouce
    };
})();