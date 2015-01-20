// Example model

var db = require('orm').db;

var Todos = db.define('todos', {
    title: String,
    done : Boolean
}, {
    methods: {
        toggle: function todo_toggle(){
            // return example;
        }
    }
});

