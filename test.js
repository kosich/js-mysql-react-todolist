var mysql      = require('mysql2');

var itemsStructure = {
    '_id' : { 
        type : 'int',
        index : true
    },
    'title' : {
        type : 'varchar(max)'
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

connection.execute('CREATE DATABASE IF NOT EXISTS dummy', function( err, res ){
    if ( err )
        return console.error( err );

    console.log( 'database created' );
    connection.end();

    var dbConnection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'dummy'
    });              

    dbConnection.execute('CREATE TABLE IF NOT EXISTS todos ( _id INT PRIMARY KEY AUTO_INCREMENT, title varchar(100) NOT NULL )', function( err, res ){
        if ( err ) throw err;

        console.log( 'table created' );

        var post  = { title: 'Hello MySQL' };
        var query = dbConnection.query('INSERT INTO todos SET ?', post, function(err, result) {
            if ( err ) throw err;

            console.log( 'inserted' );
            dbConnection.query('SELECT * FROM todos', function( err, res ){
                if ( err ) throw err;
                console.log( res );

                dbConnection.end();
            });
        });

    });

});

