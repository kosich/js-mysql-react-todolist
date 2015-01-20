var express = require('express'),
    db = require('orm').db,
    Todos = db.models.todos;


// TODOS LIST
var list = express.Router();
list.route('/items')
    .get(function( req, res, next ) {
        Todos.find(function(err, items){
            if(err){ return next(err); }

            res.json( items );

        });
    })
    .post(function( req, res, next ) {
        var item = Todos.create(req.body, function(err, item){
            if(err){ return next(err); }
            res.json( item );
        });
    });



// TODOS ITEM BY ID
var item = express.Router();
item.param('id', function(req, res, next, id) {

    Todos.get( id, function( err, item ){
        if (err) { return next(err); }

        req.item = item;
        next();
    } );

});

item.route('/items/:id')
    .get(function( req, res, next ) {
        res.json( [ req.item ] );
    })
    .put(function(req, res, next) {
        // just an example of maybe updating the user

        if ( req.body.hasOwnProperty('title') )
            req.item.title = req.body.title;

        // NOTE: Boolean get encoded/decoded as string
        if ( req.body.hasOwnProperty('done') )
            req.item.done = req.body.done == 'true';

        req.item.save( function() {
            res.json( req.item );
        } );
    })
    .delete(function(req, res, next) {
        req.item.remove( function( err ){
            if (!err)
                res.json( [] )
        } );
    });


exports.rest = [ list, item ];
