/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
    'use strict';

    var Utils = app.Utils;
    var extend = $.extend;

    var defaultTodo = {
        done : false
    };

    // Generic "model" object. You can use whatever
    // framework you want. For this application it
    // may not even be worth separating this logic
    // out, but we do this to demonstrate one way to
    // separate out parts of your application.
    var TodoModel = function TodoModel (key) {
        this.key = key;
        this.todos = [];
        this.onChanges = [];
    };

    extend( TodoModel.prototype, {
        subscribe : function (onChange) {
            this.onChanges.push(onChange);
        },
        inform : function inform () {
            // TODO: save items
            // Utils.store(this.key, this.todos);
            this.onChanges.forEach(function (cb) { cb(); });
        },
        addTodo : function addTodo(title) {
            var todo = extend( { title : title }, defaultTodo ),
                self = this;

            $.ajax( '/items', {
                cache : false,
                data  : todo,
                type  : 'POST'
            } ).done( function( _id ){
                todo._id = _id;
                data.push( todo );

                self.inform();
            } ).fail( onFail );
        },
        toggleAll : function (checked) {
            // Note: it's usually better to use immutable data structures since they're
            // easier to reason about and React works very well with them. That's why
            // we use map() and filter() everywhere instead of mutating the array or
            // todo items themselves.
            this.todos = this.todos.map(function (todo) {
                return Utils.extend({}, todo, {completed: checked});
            });

            this.inform();
        },

        toggle : function ( todo ) {
            var self = this;

            $.ajax( '/items/' + todo._id , {
                cache : false,
                data  : { done : todo.done },
                type  : 'PUT'
            }).done( function(  ){
                todo.done = !todo.done;
                self.inform();
            } );

        },

        destroy : function (todo) {
            var self = this;

            $.ajax( '/items/' + todo._id , {
                cache : false,
                type  : 'DELETE'
            }).done( function(  ){
                self.todos.splice( self.todos.indexOf( todo ), 1 );
                self.inform();
            } );

        },

        save : function (todo, title) {
            var self = this;

            $.ajax( '/items/' + todo._id , {
                cache : false,
                data  : { title : title },
                type  : 'PUT'
            }).done( function(  ){
                todo.title = title;
                self.inform();
            } );
        },

        clearCompleted : function () {
            this.todos = this.todos.filter(function (todo) {
                return !todo.completed;
            });

            this.inform();
        }

    });


    function onFail (){
    }

    app.TodoModel = TodoModel;

})();
