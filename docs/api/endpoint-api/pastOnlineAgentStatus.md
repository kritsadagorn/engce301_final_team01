# api/v1/postOnlineAgentStatus

To updating / insert various values of OnlineAgentsTable of specified AgentCode. Such as AgentName, IsLogin, AgentStatus

## API Information

| Information  | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
| API URL      | https://lab-api.cpe-rmutl.net/team01/api/v1/postOnlineAgentStatus |
| Method       | POST                                                              |
| Content-Type | multipart/form-data                                               |

## Headers request

| Header        | Description  | Value          |
| ------------- | ------------ | -------------- |
| Authorization | Bearer Token | Bearer {token} |
| x-auth-token  | JWT Token    | {token}        |

## Body request

| Parameter   | Type   | Description                                              | Value |
| ----------- | ------ | -------------------------------------------------------- | ----- |
| AgentCode   | string | Agent Code                                               | 9998  |
| AgentName   | string | Agent display name                                       | Dev2  |
| IsLogin     | string | Default login mode (Referer [Agent status](#login-mode)) | 1     |
| AgentStatus | string | Agent status (Referer [Agent status](#agent-status))     | 1     |

## Response

```json
{
  "error": false,
  "statusCode": 200,
  "data": "Agent was inserted or updated"
}
```

| Field      | Type    | Description                  |
| ---------- | ------- | ---------------------------- |
| error      | boolean | Request is successful or not |
| statusCode | int     | HTTP status code             |
| data       | string  | Response data                |

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
