// นำเข้าโมดูลต่างๆ ที่ใช้ในการสร้างเว็บเซิร์ฟเวอร์
// Main API
const hapi = require("@hapi/hapi");
let express = require("express");
const AuthBearer = require("hapi-auth-bearer-token");
let fs = require("fs");
let cors = require("cors");

const OnlineAgent = require("./repository/OnlineAgent");

//-------------------------------------
// ปิดการตรวจสอบใบรับรอง SSL ในการเชื่อมต่อ
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// กำหนดพอร์ตของ API
const apiport = 8443;

var url = require("url");
const { request, Agent } = require("http");
const { unauthorized } = require("@hapi/boom");

// เริ่มต้น Express
var app = express();
// สร้าง Router สำหรับ Express
var router = express.Router();

// เชื่อมต่อ router เข้ากับ Express
app.use("/", router);


// ใช้ @hapi รัน Express ทำไม?
router.get("/status", function (req, res) {
  res.json({
    status: "App is running!",
  });
});


//----------------------------------------------

// ฟังก์ชันสำหรับเริ่มต้นเซิร์ฟเวอร์ Hapi
const init = async () => {
  // ปรับการตั้งค่าให้รองรับ Listener สูงสุด
  require("events").defaultMaxListeners = 0;
  process.setMaxListeners(0);

  // กำหนดไฟล์ที่ใช้สำหรับการเข้ารหัส TLS (SSL)
  var fs = require("fs");

  var tls = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
  };

  // สร้างเซิร์ฟเวอร์ Hapi ด้วยการตั้งค่า TLS
  const server = hapi.Server({
    port: apiport,
    host: "0.0.0.0",
    tls: tls,
    routes: {
      cors: {
        origin: ["*"],
        headers: [
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Origin",
          "Accept",
          "Authorization",
          "Content-Type",
          "If-None-Match",
          "Accept-language",
        ],
        additionalHeaders: [
          "Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization",
        ],
        credentials: true,
      },
    },
  });

  // ลงทะเบียน Plugin สำหรับการให้บริการไฟล์สถิติ
  await server.register(require("@hapi/inert"));

  // ลงทะเบียน Plugin สำหรับการตรวจสอบ Bearer Token
  await server.register(AuthBearer);

  // ตั้งค่าการยืนยันตัวตนด้วย Bearer Token
  server.auth.strategy("simple", "bearer-access-token", {
    allowQueryToken: true, // สามารถใช้ token ใน query ได้
    unauthorized: () => unauthorized("Invalid Auth key."), // กรณีที่ไม่มีการตรวจสอบ token
    validate: async (request, token, h) => {
      const isValid =
        token ===
        "1aaZ!ARgAQGuQzp00D5D000000.mOv2jmhXkfIsjgywpCIh7.HZpc6vED1LCbc90DTaVDJwdNqbTW5r4uZicv8AFfkOE1ialqnR8UN5.wnAgh090h";

      const credentials = { token };
      const artifacts = { test: "info" };

      return { isValid, credentials, artifacts };
    },
  });

  // ตั้งค่าการยืนยันตัวตนเริ่มต้น
  server.auth.default("simple");

  //-- การตั้งค่า Route สำหรับ API --------

  // เส้นทางหลักสำหรับ API ที่ให้บริการข้อความทดสอบ
  server.route({
    method: "GET",
    path: "/",
    config: {
      cors: {
        origin: ["*"],
        headers: [
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Origin",
          "Accept",
          "Authorization",
          "Content-Type",
          "If-None-Match",
          "Accept-language",
        ],
        additionalHeaders: [
          "Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization",
        ],
        credentials: true,
      },
    },
    handler: async (request, h) => {
      try {
        return "Test Hello, from Endpoint Web Report API.";
      } catch (err) {
        console.dir(err);
      }
    },
  });

  // เส้นทาง API สำหรับดึงข้อมูล Agent ด้วย agentcode
  server.route({
    method: "GET",
    path: "/api/v1/getOnlineAgentByAgentCode",
    config: {
      cors: {
        origin: ["*"],
        headers: [
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Origin",
          "Accept",
          "Authorization",
          "Content-Type",
          "If-None-Match",
          "Accept-language",
        ],
        additionalHeaders: [
          "Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization",
        ],
        credentials: true,
      },
    },
    handler: async (request, h) => {
      let param = request.query;

      try {
        param.agentcode;
        if (param.agentcode == null)
          return h.response("Please provide agentcode.").code(400);
        else {
          const responsedata =
            await OnlineAgent.OnlineAgentRepo.getOnlineAgentByAgentCode(
              `${param.agentcode}`
            );

          if (responsedata.statusCode == 500)
            return h
              .response("Something went wrong. Please try again later.")
              .code(500);
          else if (responsedata.statusCode == 200) return responsedata;
          else if (responsedata.statusCode == 404)
            return h.response(responsedata).code(404);
          else
            return h
              .response("Something went wrong. Please try again later.")
              .code(500);
        }
      } catch (err) {
        console.dir(err);
      }
    },
  });

  // เส้นทาง API สำหรับเพิ่มหรืออัพเดทข้อมูล Agent
  server.route({
    method: "POST",
    path: "/api/v1/postOnlineAgentStatus", // Fixed the missing leading slash
    config: {
      cors: {
        origin: ["*"],
        headers: [
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Origin",
          "Accept",
          "Authorization",
          "Content-Type",
          "If-None-Match",
          "Accept-language",
        ],
        additionalHeaders: [
          "Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization",
        ],
        credentials: true,
      },
    },
    handler: async (request, h) => {
      const { AgentCode, AgentName, IsLogin, AgentStatus } = request.payload;
      try {
        if (AgentCode == null) {
          return h.response("Please provide agentcode.").code(400);
        } else {
          const responsedata =
            await OnlineAgent.OnlineAgentRepo.getOnlineAgentByAgentCode(
              `${AgentCode}` 
            );

          if (responsedata.statusCode == 500)
            return h
              .response("Something went wrong. Please try again later.")
              .code(500);

          if (responsedata.statusCode == 404) {
            return OnlineAgent.OnlineAgentRepo.createAgent(
              AgentCode,
              AgentName,
              IsLogin,
              AgentStatus
            );
          } else if (responsedata.statusCode == 200) {
            return OnlineAgent.OnlineAgentRepo.updateAgent(
              AgentCode,
              AgentName,
              IsLogin,
              AgentStatus
            );
          } else if (responsedata.statusCode == 404) {
            return h.response(responsedata).code(404);
          } else {
            return h
              .response("Something went wrong. Please try again later.")
              .code(500);
          }
        }
      } catch (err) {
        console.dir(err);
      }
    },
  });

  // จัดการข้อผิดพลาดจากการร้องขอ
  server.ext("onPreResponse", (req, h) => {
    const response = req.response;

    console.error(response);

    if (response.isBoom) {
      const { output } = response;
      return h
        .response({
          error: output.payload.message,
        })
        .code(output.statusCode);
    }

    return h.continue;
  });

  //----------------------------------------------

  await server.start();
  console.log("Webreport API Server running on %s", server.info.uri);
};

// ฟังข้อผิดพลาดที่ไม่จับ
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
