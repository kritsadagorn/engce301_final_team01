# api/v1/auth/logout

Logout agent.

## API Information

| Information  | Value                                                   |
| ------------ | ------------------------------------------------------- |
| API URL      | https://lab-api.cpe-rmutl.net/team01/api/v1/auth/logout |
| Method       | GET                                                     |
| Content-Type | -                                                       |

## Headers request

| Header        | Description  | Value          |
| ------------- | ------------ | -------------- |
| Authorization | Bearer Token | Bearer {token} |
| x-auth-token  | JWT Token    | {token}        |

## Response

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": null
}
```

| Field      | Type     | Description                      |
| ---------- | -------- | -------------------------------- |
| message    | string   | Request is successful or not     |
| statusCode | int      | HTTP status code                 |
| data       | nullable | Response data (Always null data) |

## Headers request

| Header       | Description                    | Value            |
| ------------ | ------------------------------ | ---------------- |
| Content-Type | Data response type you receive | application/json |
