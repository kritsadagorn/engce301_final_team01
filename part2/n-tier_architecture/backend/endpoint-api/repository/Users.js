const sql = require("mssql");

const { sqlConfig } = require("../config");


/**
 *
 * @param {string} username
 * @returns
 */
async function getUserByUsername(username) {
  let pool = await sql.connect(sqlConfig);
  return pool.query`select u.user_id, u.username, u.password, u.agent_id, oa.agent_code, oa.AgentName, oa.AgentStatus, oa.IsLogin from Users u left join [OnlineAgents] oa on oa.OnlineAgent_id = u.agent_id  WHERE u.username = ${username}`;
}

module.exports = {
  getUserByUsername,
};