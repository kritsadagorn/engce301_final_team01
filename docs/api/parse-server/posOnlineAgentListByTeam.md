# /postOnlineAgentListByTeam

For updating agent status and their information.

## API Information

| Information  | Value                                                                                 |
| ------------ | ------------------------------------------------------------------------------------- |
| API URL      | https://lab-parse-server.cpe-rmutl.net/team01/api/functions/postOnlineAgentListByTeam |
| Method       | POST                                                                                  |
| Content-Type | application/json                                                                      |

## Headers request

| Header                 | Description          | Value        |
| ---------------------- | -------------------- | ------------ |
| X-Parse-Application-Id | Parse application ID | wallboardapi |
| X-Parse-Master-Key     | Parse master key     | wallboardapi |

## Params request

| Name            | Description                                              | Value |
| --------------- | -------------------------------------------------------- | ----- |
| AgentCode       | Agent Code                                               | 9998  |
| AgentName       | Agent display name                                       | Dev2  |
| Team            | Team ID (0-9)                                            | 6     |
| AgentStatus     | Agent status (Referer [Agent status](#agent-status))     | 1     |
| AgentStatusCode | Agent status code (Same as "AgentStatus")                | 1     |
| IsLogin         | Default login mode (Referer [Agent status](#login-mode)) | 1     |

## Response

```json
{
  "result": 9
}
```

| Field  | Type   | Description         |
| ------ | ------ | ------------------- |
| result | string | Result agent status |

## Headers request

| Header       | Description                    | Value            |
| ------------ | ------------------------------ | ---------------- |
| Content-Type | Data response type you receive | application/json |

---

## Result code

| Code | Description                      |
| ---- | -------------------------------- |
| 0    | Success create / delete.         |
| 1    | [AgentCode] field required       |
| 2    | [Team] field required            |
| 3    | [AgentStatus] field required     |
| 4    | [AgentStatusCode] field required |
| 5    | [IsLogin] field required         |
| 6    | [startedAt] field required       |
| 9    | Success update.                  |
| 11   | [AgentCode] field required       |
| 12   | [AgentName] field required       |
| 13   | [Team] field required            |
| 14   | [AgentStatus] field required     |
| 15   | [AgentStatusCode] field required |
| 16   | [IsLogin] field required         |
| 17   | [startedAt] field required       |

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
