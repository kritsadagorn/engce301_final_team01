// นำเข้าโมดูล mssql เพื่อเชื่อมต่อกับฐานข้อมูล SQL
const sql = require("mssql");
// ตั้งค่าการเชื่อมต่อฐานข้อมูล SQL
const sqlConfig = require("../sqlConfig")["development"];

// นำเข้า UUID สำหรับการสร้างตัวแปร UUID
const { v4: uuid } = require("uuid");

// แสดงค่าการตั้งค่า sqlConfig ที่ใช้ในการเชื่อมต่อฐานข้อมูล
console.log("sqlConfig: ", sqlConfig);

// ฟังก์ชันสำหรับดึงข้อมูลของ Agent โดยใช้ agentcode
async function getOnlineAgentByAgentCode(agentcode) {
  try {
    console.log("agentcode: ", agentcode);

    // เชื่อมต่อกับฐานข้อมูล
    let pool = await sql.connect(sqlConfig);

    // ทำการ query ข้อมูลจากฐานข้อมูล
    let result = await pool
      .request()
      .query(
        `SELECT * FROM [OnlineAgents] WHERE [agent_code] = '${agentcode}'`
      ); //@agentcode

    console.log("result: ", result);

    // ตรวจสอบผลลัพธ์จากการ query
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

// ฟังก์ชันสำหรับสร้าง Agent ใหม่ในฐานข้อมูล
async function createAgent(AgentCode, AgentName, IsLogin, AgentStatus) {
  try {
    console.log("agentcode: ", AgentCode);

    // เชื่อมต่อกับฐานข้อมูล
    let pool = await sql.connect(sqlConfig);

    // ทำการ query เพื่อเพิ่มข้อมูล Agent ลงในฐานข้อมูล
    let result =
      await pool.query`INSERT INTO [OnlineAgentss] (agent_code, AgentName, IsLogin, AgentStatus) VALUES (${AgentCode},${AgentName},${IsLogin},${AgentStatus})`;
    console.log("result: ", result);

    return {
      error: false,
      statusCode: 200,
      data: "Agent was inserted",
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

// ฟังก์ชันสำหรับอัพเดทข้อมูล Agent ที่มีอยู่ในฐานข้อมูล
async function updateAgent(AgentCode, AgentName, IsLogin, AgentStatus) {
  try {
    console.log("agentcode ", AgentCode);

    // เชื่อมต่อกับฐานข้อมูล
    let pool = await sql.connect(sqlConfig);

    // ทำการ query เพื่ออัพเดทข้อมูล Agent
    let result =
      await pool.query`UPDATE [OnlineAgents] SET AgentName = ${AgentName}, IsLogin = ${IsLogin}, AgentStatus = ${AgentStatus} WHERE agent_code = ${AgentCode}`;

    console.log("result: ", result);
    return {
      error: false,
      statusCode: 200,
      data: "Agent was updated",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

// ส่งออกฟังก์ชันทั้งหมดที่ใช้ในการทำงานกับ Agent
module.exports.OnlineAgentRepo = {
  getOnlineAgentByAgentCode: getOnlineAgentByAgentCode,
  createAgent,
  updateAgent,
};
