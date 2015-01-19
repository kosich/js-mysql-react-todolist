var mysql      = require('mysql');

var itemsStructure = {
    '_id' : { 
        type : 'integer',
        index : true
    },
    'title' : {
        type : 'string'
    },
    'done' : {
        type : 'bit'
    }
};

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root'
});

connection.connect();

// establish connection
// check table existance
// expose RESTful:
// - items ? state=
// - items/id [ post/put/get ]

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();
