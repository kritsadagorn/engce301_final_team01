const wbconfig = {
    development: {
      hosturl: 'https://localhost:5001/api',
      wsurl: 'wss://localhost:5001',
      masterKey: 'wallboardapi',
      clientKey: 'wallboardapi',
      javascriptKey: 'wallboardapi',
      appId: 'wallboardapi',
    },
    production: {
      hosturl: 'https://lab-parse-server.cpe-rmutl.net/team01/api',
      wsurl: 'wss://lab-parse-server.cpe-rmutl.net/team01',
      masterKey: 'wallboardapi',
      clientKey: 'wallboardapi',
      javascriptKey: 'wallboardapi',
      appId: 'wallboardapi',
    },
  }
  export default wbconfig[import.meta.env.PROD ? 'production' : 'development']