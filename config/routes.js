module.exports = function(app){

    var todos = require('../app/controllers/todos');
    app.use('/', todos.rest);

    //home route
    var home = require('../app/controllers/home');
    app.use('/', home.index);


    app.use(function(req, res) {
        res.status(404).render('404', { title: '404' });
    });
};
