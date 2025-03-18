# /getAgentMessageHistories

Get agent message histories

## API Information

| Information  | Value                                                                                |
| ------------ | ------------------------------------------------------------------------------------ |
| API URL      | https://lab-parse-server.cpe-rmutl.net/team01/api/functions/getAgentMessageHistories |
| Method       | POST                                                                                 |
| Content-Type | application/json                                                                     |

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
        "from_agent_code": "9999",
        "to_agent_code": "9998",
        "message": "หยุดดิ๊!!!",
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

| Field                         | Type   | Description            |
| ----------------------------- | ------ | ---------------------- |
| result.data.from_agent_code   | string | Agent code (From send) |
| result.data.to_agent_code     | string | Agent code (To send)   |
| result.data.message           | string | Message / Content data |
| result.data.createdAt         | string | Created date           |
| result.data.updatedAt         | string | Updated date           |
| result.pagination.currentPage | int    | Current page number    |
| result.pagination.totalPage   | int    | Total page number      |

## Headers request

| Header       | Description                    | Value            |
| ------------ | ------------------------------ | ---------------- |
| Content-Type | Data response type you receive | application/json |

---
