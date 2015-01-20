/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
    'use strict';

    app.ALL_TODOS = 'all';
    app.ACTIVE_TODOS = 'active';
    app.COMPLETED_TODOS = 'completed';
    var TodoFooter = app.TodoFooter;
    var TodoItem = app.TodoItem;

    var ENTER_KEY = 13;

    var TodoApp = React.createClass({
        getInitialState: function () {
            return {
                nowShowing: app.ALL_TODOS,
                editing: null
            };
        },

        changeFilter : function changeFilter( filter ){
            this.setState( {
                nowShowing : filter
            } );
        },

        componentDidMount: function () {
            var router = Router({
                '/'          : this.changeFilter.bind(this, app.ALL_TODOS),
                '/active'    : this.changeFilter.bind(this, app.ACTIVE_TODOS),
                '/completed' : this.changeFilter.bind(this, app.COMPLETED_TODOS)
            });
            router.init('/');

            var self = this;
            $.get( '/items', function( data ){

                // if status ok
                console.log( 'initial fetch', data );

                self.props.model.todos = data;
                self.props.model.inform();
                // TODO: how to properly run rerender?
                // self.setState();

            } );
        },

        handleNewTodoKeyDown: function (event) {
            if (event.which !== ENTER_KEY) {
                return;
            }

            event.preventDefault();

            var val = this.refs.newField.getDOMNode().value.trim();

            if (val) {
                this.props.model.addTodo(val);
                this.refs.newField.getDOMNode().value = '';
            }
        },

        toggleAll: function (event) {
            var checked = event.target.checked;
            this.props.model.toggleAll(checked);
        },

        toggle: function (todoToToggle) {
            this.props.model.toggle(todoToToggle);
        },

        destroy: function (todo) {
            this.props.model.destroy(todo);
        },

        edit: function (todo, callback) {
            // refer to todoItem.js `handleEdit` for the reasoning behind the
            // callback
            this.setState({editing: todo.id}, function () {
                callback();
            });
        },

        save: function (todoToSave, text) {
            this.props.model.save(todoToSave, text);
            this.setState({editing: null});
        },

        cancel: function () {
            this.setState({editing: null});
        },

        clearCompleted: function () {
            this.props.model.clearCompleted();
        },

        render: function () {
            var footer;
            var main;
            var todos = this.props.model.todos;

            var shownTodos = todos.filter(function (todo) {
                switch (this.state.nowShowing) {
                    case app.ACTIVE_TODOS:
                        return !todo.done;
                    case app.COMPLETED_TODOS:
                        return todo.done;
                    default:
                        return true;
                }
            }, this);

            var todoItems = shownTodos.map(function (todo) {
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={this.toggle.bind(this, todo)}
                        onDestroy={this.destroy.bind(this, todo)}
                        onEdit={this.edit.bind(this, todo)}
                        editing={this.state.editing === todo.id}
                        onSave={this.save.bind(this, todo)}
                        onCancel={this.cancel}
                    />
                );
            }, this);

            var activeTodoCount = todos.reduce(function (accum, todo) {
                return todo.done ? accum : accum + 1;
            }, 0);

            var completedCount = todos.length - activeTodoCount;

            if (activeTodoCount || completedCount) {
                footer =
                    <TodoFooter
                        count={activeTodoCount}
                        completedCount={completedCount}
                        nowShowing={this.state.nowShowing}
                        onClearCompleted={this.clearCompleted}
                    />;
            }

            if (todos.length) {
                main = (
                    <section id="main">
                        <input
                            id="toggle-all"
                            type="checkbox"
                            onChange={this.toggleAll}
                            checked={activeTodoCount === 0}
                        />
                        <ul id="todo-list">
                            {todoItems}
                        </ul>
                    </section>
                );
            }

            return (
                <div>
                    <header id="header">
                        <h1>todos</h1>
                        <input
                            ref="newField"
                            id="new-todo"
                            placeholder="What needs to be done?"
                            onKeyDown={this.handleNewTodoKeyDown}
                            autoFocus={true}
                        />
                    </header>
                    {main}
                    {footer}
                </div>
            );
        }
    });

    var model = new app.TodoModel('react-todos');

    function render() {
        React.render(
            <TodoApp model={model}/>,
            document.getElementById('todoapp')
        );
    }

    model.subscribe(render);
    render();
})();