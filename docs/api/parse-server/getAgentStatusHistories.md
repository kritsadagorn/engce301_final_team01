# /getAgentStatusHistories

Get agent status change histories

## API Information

| Information  | Value                                                                               |
| ------------ | ----------------------------------------------------------------------------------- |
| API URL      | https://lab-parse-server.cpe-rmutl.net/team01/api/functions/getAgentStatusHistories |
| Method       | POST                                                                                |
| Content-Type | application/json                                                                    |

## Headers request

| Header                 | Description          | Value        |
| ---------------------- | -------------------- | ------------ |
| X-Parse-Application-Id | Parse application ID | wallboardapi |
| X-Parse-Master-Key     | Parse master key     | wallboardapi |

## Params request

| Name | Description | Value |
| ---- | ----------- | ----- |
| page | Page number | 0     |
| size | Page size   | 10    |

## Response

```json
{
  "result": {
    "data": [
      {
        "agent_code": "9999",
        "agent_name": "Dev2",
        "status_from": "1",
        "status_to": "1",
        "createdAt": "2025-03-18T10:46:37.468Z",
        "updatedAt": "2025-03-18T10:46:37.468Z"
      }
    ],
    "pagination": {
      "currentPage": 0,
      "totalPage": 1
    }
  }
}
```

| Field                         | Type   | Description                                                        |
| ----------------------------- | ------ | ------------------------------------------------------------------ |
| result.data.agent_code        | string | Agent code                                                         |
| result.data.agent_name        | string | Agent name                                                         |
| result.data.status_from       | string | Agent status before change (Referer [Agent status](#agent-status)) |
| result.data.status_to         | string | Agent status after change (Referer [Agent status](#agent-status))  |
| result.data.createdAt         | string | Created date                                                       |
| result.data.updatedAt         | string | Updated date                                                       |
| result.pagination.currentPage | int    | Current page number                                                |
| result.pagination.totalPage   | int    | Total page number                                                  |

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
