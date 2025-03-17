import { Parse } from 'parse'
import wbconfig from './wbconfig'
Parse.serverURL = wbconfig.hosturl
Parse.liveQueryServerURL = wbconfig.wsurl

console.log('hosturl: ' + wbconfig.hosturl)
console.log('wsurl: ' + wbconfig.wsurl)

Parse.initialize(
  wbconfig.appId, // Application ID
  wbconfig.javascriptKey, // Javascript key
  wbconfig.masterKey, // Master key
)

export default Parse