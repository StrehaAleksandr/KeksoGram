'use strict';

(function() {
    function isEscape(evt, callback1) {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            callback1();
        }
    }

    function isEscape2(evt, callback1, callback2) {
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

    window.util = {
        isEscape: isEscape,
        isEscape2: isEscape2,
        isEnter: isEnter
    };
})();