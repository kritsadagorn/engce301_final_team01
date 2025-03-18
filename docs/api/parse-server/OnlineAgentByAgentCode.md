# /OnlineAgentByAgentCode

To get agent status and information.

## API Information

| Information  | Value                                                                              |
| ------------ | ---------------------------------------------------------------------------------- |
| API URL      | https://lab-parse-server.cpe-rmutl.net/team01/api/functions/OnlineAgentByAgentCode |
| Method       | POST                                                                               |
| Content-Type | application/json                                                                   |

## Headers request

| Header                 | Description          | Value        |
| ---------------------- | -------------------- | ------------ |
| X-Parse-Application-Id | Parse application ID | wallboardapi |
| X-Parse-Master-Key     | Parse master key     | wallboardapi |

## Params request

| Name      | Description | Value |
| --------- | ----------- | ----- |
| AgentCode | Agent code  | 9998  |

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

| Code | Description          |
| ---- | -------------------- |
| 1    | Avaliable            |
| 2    | Active               |
| 3    | Warp                 |
| 4    | Not ready            |
| 9    | Something went wrong |
