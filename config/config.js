var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'mysqlexpress'
        },
        port: 3000,
        db: 'mysql://root:root@localhost/todolist'
    }

    // test: {
    //     root: rootPath,
    //     app: {
    //         name: 'mysqlexpress'
    //     },
    //     port: 3000,
    //     db: 'mysql://root@localhost/mysqlexpress_test'
    // },

    // production: {
    //     root: rootPath,
    //     app: {
    //         name: 'mysqlexpress'
    //     },
    //     port: 3000,
    //     db: 'mysql://root@localhost/mysqlexpress_production'
    // }
};

module.exports = config[env];
