# api/v1/auth/login

Login agent user via desktop app (agent-notification)

## API Information

| Information  | Value                                                  |
| ------------ | ------------------------------------------------------ |
| API URL      | https://lab-api.cpe-rmutl.net/team01/api/v1/auth/login |
| Method       | POST                                                   |
| Content-Type | multipart/form-data                                    |

## Headers request

| Header        | Description  | Value          |
| ------------- | ------------ | -------------- |
| Authorization | Bearer Token | Bearer {token} |

## Body request

| Parameter | Type   | Description       | Value     |
| --------- | ------ | ----------------- | --------- |
| username  | string | Username of agent | agnet9998 |
| password  | string | Password of agent | 123456    |

## Response

```json
{
  "error": false,
  "statusCode": 200,
  "errMessage": "Success",
  "data": {
    "agent_code": "9999",
    "agent_name": "Dev2",
    "agent_status": "2",
    "agent_status_code": "2",
    "is_login": "1",
    "token": "eyJhbGci...."
  }
}
```

| Field                  | Type    | Description                                          |
| ---------------------- | ------- | ---------------------------------------------------- |
| error                  | boolean | Request is successful or not                         |
| statusCode             | int     | HTTP status code                                     |
| data.agent_code        | string  | Agent code                                           |
| data.agent_name        | string  | Agent display name                                   |
| data.agent_status      | string  | Agent status (Referer [Agent status](#agent-status)) |
| data.agent_status_code | string  | Agent status code (Same as data.agent_status)        |
| data.is_login          | string  | Login mode (Referer [Agent status](#login-mode))     |
| data.token             | string  | JWT token                                            |

## Headers request

| Header       | Description                    | Value            |
| ------------ | ------------------------------ | ---------------- |
| Content-Type | Data response type you receive | application/json |

---

### Agent Status

| Type | Description |
| ---- | ----------- |
| 1    | Avaliable   |
| 2    | Active      |
| 3    | Warp        |
| 4    | Not ready   |

### Login mode

| Type | Description |
| ---- | ----------- |
| 1    | Login       |
| 0    | Logout      |
