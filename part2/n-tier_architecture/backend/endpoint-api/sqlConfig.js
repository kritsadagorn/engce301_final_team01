// Setup Local & Server

var dbconfig = {
    development: {
        server: '192.168.56.103',
        database:'team1_engce301_db',
        user:'team1',
        password:'P@ssw0rd',
        port: 1433,
        options:{
            encript: true,
            setTimeout: 12000,
            enableArithAbort: true,
            trustServerCertificate: true,
            trustedconnection:  true,
            instancename:  '192.168.56.103'  // SQL Server instance name
        }
    },
    production: {
        server: '10.21.43.203', //SE Lab Server
        database:'team1_engce301_db',
        user:'team1',
        password:'P@ssw0rd',
        port: 1433,
        options:{
            encript: true,
            setTimeout: 12000,
            enableArithAbort: true,
            trustServerCertificate: true,
            trustedconnection:  true,
            instancename:  '10.21.43.203'  // SQL Server instance name
        }
    },

};

module.exports = dbconfig;
