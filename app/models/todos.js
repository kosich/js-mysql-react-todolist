// Example model

var db = require('orm').db;

var Todos = db.define('todos', {
    title: String,
    done : {
        type: 'number',
        rational: false,
        size: 1,
        unsigned: true
    }
}, {
    cache   : false,
    methods: {
        toggle: function todo_toggle(){
            // return example;
        }
    }
});

