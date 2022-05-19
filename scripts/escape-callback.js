'use strict';

(function() {
    function EscapeCallBack(evt, callback) {
        if (evt.key === 'Escape') {
            callback();
        }
    }

    window.EscapeCallBack = EscapeCallBack;
})();