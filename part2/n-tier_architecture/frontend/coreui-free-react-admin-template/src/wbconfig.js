const wbconfig = {
    development: {
        hosturl  : 'https://172.17.58.183:4000/api',
        wsurl    : 'wss://172.17.58.183:4000',
        masterKey     : 'wallboardapi',
        clientKey     : 'wallboardapi',
        javascriptKey : 'wallboardapi',
        appId : "wallboardapi"
    },
    production: {
        hosturl  : 'https://lab-parse-server.cpe-rmutl.net/team01/api',
        wsurl    : 'wss://lab-parse-server.cpe-rmutl.net/team01',
        masterKey     : 'wallboardapi',
        clientKey     : 'wallboardapi',
        javascriptKey : 'wallboardapi',
        appId : "wallboardapi"
    }
};
export default wbconfig;
