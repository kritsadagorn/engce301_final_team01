const Parse = require("parse/node");
const { parseConfig } = require("../config");

Parse.serverURL = parseConfig.apiURL;
// Init parse
Parse.initialize(
  parseConfig.appId,
  parseConfig.javascriptKey,
  parseConfig.masterKey
);

console.log(`API URL: ${Parse.serverURL}`);
console.log(`APP ID: ${Parse.applicationId}`);
console.log(`Master key: ${Parse.masterKey}`);
console.log(`JS key: ${Parse.javaScriptKey}`);

/**
 *
 * @param {{
 *   agent_code: string;
 *   agent_name: string;
 *   action: "0" | "1"
 * }} data
 */
function createUserLoginHistories(data) {
  const UserLogin = new Parse.Object("UserLoginHistories");
  UserLogin.set("agent_code", data.agent_code);
  UserLogin.set("agent_name", data.agent_name);
  UserLogin.set("is_login", data.action);
  UserLogin.save(
    {},
    {
      useMasterKey: true,
    }
  );
}

/**
 *
 * @param {{
 *   agent_code: string;
 *   agent_name: string;
 *   agent_status: string;
 *   is_login: string;
 *   team: string;
 * }} data
 */
function upsertAgent(data) {
  Parse.Cloud.run(
    "postOnlineAgentListByTeam",
    {
      AgentCode: data.agent_code,
      AgentName: data.agent_name,
      Team: "6",
      AgentStatus: data.agent_status,
      AgentStatusCode: data.agent_status,
      IsLogin: data.is_login,
    },
    {
      useMasterKey: true,
    }
  );
}

/**
 *
 * @param {{
 *   from: {
 *     agent_code: string;
 *   }
 *   to: {
 *      agent_code: string;
 *   }
 *   message: string;
 * }} data
 */
function createAgentMessageHistories(data) {
  const AgentMessage = new Parse.Object("AgentMessageHistories");
  AgentMessage.set("from_agent_code", data.from.agent_code);
  AgentMessage.set("to_agent_code", data.to.agent_code);
  AgentMessage.set("message", data.message);
  AgentMessage.save(
    {},
    {
      useMasterKey: true,
    }
  );
}

module.exports = {
  createUserLoginHistories,
  createAgentMessageHistories,
  upsertAgent,
};