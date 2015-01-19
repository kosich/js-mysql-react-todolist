var app = app || {};

(function () {
    'use strict';

    app.Utils = {

        pluralize: function (count, word) {
            return count === 1 ? word : word + 's';
        }

    };
})();
