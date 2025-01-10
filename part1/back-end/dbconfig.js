var dbconfig = {
    development: {
        //connectionLimit : 10,
        host     : '192.168.1.124',
        port     : '3306',
        user     : 'root',
        password : '',
        database : 'moviedb'
    },
    production: {
        //connectionLimit : 10,
        host     : '192.168.56.102',
        port     : '3306',
        user     : 'root',
        password : '',
        database : 'moviedb'
    }
    };
module.exports = dbconfig;
