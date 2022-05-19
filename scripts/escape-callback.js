'use strict';

(function() {
    function EscapeCallBack(evt, callback) {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            callback();
        }
    }

    window.EscapeCallBack = EscapeCallBack;
})();