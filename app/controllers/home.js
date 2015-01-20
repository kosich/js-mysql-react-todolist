var db = require('orm').db,
    Todos = db.models.todos;

exports.index = function(req, res){
    Todos.find(function(err, todos){
        if(err) throw new Error(err);

        res.render('index', {
            title: 'Generator-Express MVC',
            todos: todos
        });
    });
};
