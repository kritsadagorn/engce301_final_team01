# api/v1/postSendMessage

Send message to another agent by Agent Code

## API Information

| Information  | Value                                                       |
| ------------ | ----------------------------------------------------------- |
| API URL      | https://lab-api.cpe-rmutl.net/team01/api/v1/postSendMessage |
| Method       | POST                                                        |
| Content-Type | multipart/form-data                                         |

## Headers request

| Header        | Description  | Value          |
| ------------- | ------------ | -------------- |
| Authorization | Bearer Token | Bearer {token} |
| x-auth-token  | JWT Token    | {token}        |

## Body request

| Parameter   | Type   | Description            | Value |
| ----------- | ------ | ---------------------- | ----- |
| ToAgentCode | string | Destination Agent Code | 9999  |
| Message     | string | Message                | Hello |

## Response

```json
{
  "error": false,
  "statusCode": 200,
  "data": "Message has been sented"
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
