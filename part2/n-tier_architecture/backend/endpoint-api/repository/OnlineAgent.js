const sql = require("mssql");
const { sqlConfig } = require("../config");
const { v4: uuid } = require("uuid");

console.log("sqlConfig: ", sqlConfig);

async function getOnlineAgentByAgentCode(agentcode) {
  try {
    console.log("agentcode: ", agentcode);

    let pool = await sql.connect(sqlConfig);

    let result = await pool
      .request()
      .query(
        `SELECT * FROM [OnlineAgents] WHERE [agent_code] = '${agentcode}'`
      ); //@agentcode

    console.log("result: ", result);

    if (!result || result.recordsets[0].length === 0) {
      console.log("result: ERROR");
      return {
        error: true,
        statusCode: 404,
        errMessage: "Agent not found",
      };
    } else {
      return {
        error: false,
        statusCode: 200,
        data: result.recordset[0],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

/*
async function postOnlineAgentStatus(AgentCode, AgentName, IsLogin, AgentStatus) {

    try {
        console.log("AgentCode: ", AgentCode);
        console.log("AgentName: ", AgentName);
        console.log("IsLogin: ", IsLogin);
        console.log("AgentStatus: ", AgentStatus);

        let pool = await sql.connect(sqlConfig);

        //let result = await pool.request().query(`SELECT * FROM [OnlineAgents] WHERE [agent_code] = '${agentcode}'`); //@agentcode
       
        console.log("result: ", result);

        if (!result || result.recordsets[0].length === 0) {
            console.log("result: ERROR");
            return ({
                error: true,
                statusCode: 404,
                errMessage: 'Agent not found',
            });

        } else {

            return ({
                error: false,
                statusCode: 200,
                data: result.recordset[0]
            });

        }

    }
    catch (error) {
        console.log(error);
        return ({
             error: true,
             statusCode: 500,
             errMessage: 'An internal server error occurred',
         });
    }
}
*/

// Version Complete

async function postOnlineAgentStatus(
  AgentCode,
  AgentName,
  IsLogin,
  AgentStatus
) {
  console.log("----------------");
  console.log("AgentCode: " + AgentCode);
  console.log("AgentName: " + AgentName);
  console.log("IsLogin: " + IsLogin);
  console.log("AgentStatus: " + AgentStatus);

  try {
    let pool = await sql.connect(sqlConfig);
    let request = await pool.request();

    let agentid = 999; // uuid
    const uniqueId = uuid(); // agent_id

    console.dir("--------request---------");
    request.input("agent_id", sql.Int, agentid);
    request.input("agent_code", sql.VarChar(20), AgentCode);
    request.input("uuid", sql.VarChar(50), uniqueId);
    request.input("AgentName", sql.VarChar(20), AgentName);
    request.input("IsLogin", sql.Char(1), IsLogin);
    request.input("AgentStatus", sql.Char(1), AgentStatus);

    let result = await pool
      .request()
      .query(
        `SELECT * FROM [OnlineAgents] WHERE [agent_code] = '${AgentCode}'`
      ); //@agentcode

    if (!result || result.recordsets[0].length === 0) {
      // Can insert
      let result2 = await pool
        .request()
        .query(
          "INSERT INTO [OnlineAgents] (agent_code, agent_id, AgentName, IsLogin, AgentStatus, uuid) OUTPUT inserted.agent_code, inserted.uuid, inserted.StartOnline VALUES ('" +
            AgentCode +
            "'," +
            agentid +
            ",'" +
            AgentName +
            "','" +
            IsLogin +
            "','" +
            AgentStatus +
            "','" +
            uniqueId +
            "');"
        );
      console.dir(result2.recordset[0]);

      return {
        error: false,
        statusCode: 200,
        data: "Agent was inserted, status has been set also",
      };
    } else {
      //Can not insert / Update
      let result2 = await pool
        .request()
        .query(
          "UPDATE [OnlineAgents] SET [AgentName] = '" +
            AgentName +
            "', [IsLogin] = '" +
            IsLogin +
            "', [AgentStatus] = '" +
            AgentStatus +
            "'  WHERE [agent_code] = '" +
            AgentCode +
            "'; "
        );
      console.dir(result2);

      return {
        error: false,
        statusCode: 200,
        data: "Agent was updated",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

/**
 *
 * @param {string} agent_code
 * @param {"LOGIN" | "LOGOUT"} action
 */
async function updateAgentSession(agent_code, action) {
  let pool = await sql.connect(sqlConfig);
  if (action === "LOGIN") {
    // Create login / logout history
    await pool.query`update [OnlineAgents] set IsLogin = 1, StartOnline = ${new Date()}, LastUpdated = ${new Date()} where agent_code = ${agent_code}`;
  } else if (action === "LOGOUT") {
    // Create login / logout history
    await pool.query`update [OnlineAgents] set IsLogin = 0, LastUpdated = ${new Date()} where agent_code = ${agent_code}`;
  }
}

module.exports.OnlineAgentRepo = {
  getOnlineAgentByAgentCode,
  postOnlineAgentStatus,
  updateAgentSession,
};
