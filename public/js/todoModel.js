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
            this.onChanges.forEach(function (cb) { cb(); });
        },
        addTodo : function addTodo(title) {
            var todo = extend( { title : title }, defaultTodo ),
                self = this;

            // TODO: moveout ajax rest communication to a Manager
            // TODO: add changing queque with disabling items, being updated
            $.ajax( '/items', {
                cache : false,
                data  : todo,
                type  : 'POST'
            } ).done( function( item ){
                todo.id = item.id;

                self.todos.push( todo );

                self.inform();
            } ).fail( onFail );
        },
        toggleAll : function (checked) {
            var self = this;
            this.todos.forEach( function( todo ){
                self.toggle(todo, checked);
            } );
        },

        toggle : function ( todo, value /* optional */ ) {
            var self = this;

            // invert `done` or set to passed value
            if ( value === undefined  ){
                value = !todo.done;
            }

            $.ajax( '/items/' + todo.id , {
                cache : false,
                data  : { done : value },
                type  : 'PUT'
            }).done( function( data ){
                extend( todo, data );

                self.inform();
            } ).fail( onFail );

        },

        destroy : function (todo) {
            var self = this;

            $.ajax( '/items/' + todo.id , {
                cache : false,
                type  : 'DELETE'
            }).done( function(  ){
                self.todos.splice( self.todos.indexOf( todo ), 1 );
                self.inform();
            } ).fail( onFail );

        },

        save : function (todo, title) {
            var self = this;

            $.ajax( '/items/' + todo.id , {
                cache : false,
                data  : { title : title },
                type  : 'PUT'
            }).done( function( data ){

                extend( todo, data );
                self.inform();

            } ).fail( onFail );
        },

        clearCompleted : function () {
            var self = this;
            this.todos.forEach(function (todo) {
                if ( todo.done ){
                    self.destroy( todo );
                }
            });

            this.inform();
        }

    });


    function onFail ( err ){
        console.error( err );
    }

    app.TodoModel = TodoModel;

})();
