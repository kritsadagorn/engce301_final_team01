# /getUserLoginHistories

Get user login histories

## API Information

| Information  | Value                                                                             |
| ------------ | --------------------------------------------------------------------------------- |
| API URL      | https://lab-parse-server.cpe-rmutl.net/team01/api/functions/getUserLoginHistories |
| Method       | POST                                                                              |
| Content-Type | application/json                                                                  |

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
        "is_login": "0",
        "createdAt": "2025-03-18T10:50:15.822Z",
        "updatedAt": "2025-03-18T10:50:15.822Z"
      }
    ],
    "pagination": {
      "currentPage": 0,
      "totalPage": 1
    }
  }
}
```

| Field                         | Type   | Description                                                   |
| ----------------------------- | ------ | ------------------------------------------------------------- |
| result.data.agent_code        | string | Agent code                                                    |
| result.data.agent_name        | string | Agent name                                                    |
| result.data.is_login          | string | Agent has logged or not (Referer [Agent status](#login-mode)) |
| result.data.createdAt         | string | Created date                                                  |
| result.data.updatedAt         | string | Updated date                                                  |
| result.pagination.currentPage | int    | Current page number                                           |
| result.pagination.totalPage   | int    | Total page number                                             |

## Headers request

| Header       | Description                    | Value            |
| ------------ | ------------------------------ | ---------------- |
| Content-Type | Data response type you receive | application/json |

---

### Login mode

| Type | Description |
| ---- | ----------- |
| 1    | Login       |
| 0    | Logout      |
