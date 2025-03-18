# /hello

For testing, the parse server API is functional.

## API Information

| Information  | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
| API URL      | https://lab-parse-server.cpe-rmutl.net/team01/api/functions/hello |
| Method       | POST                                                              |
| Content-Type | application/json                                                  |

## Headers request

| Header                 | Description          | Value        |
| ---------------------- | -------------------- | ------------ |
| X-Parse-Application-Id | Parse application ID | wallboardapi |
| X-Parse-Master-Key     | Parse master key     | wallboardapi |

## Response

```json
{
  "result": "Hi from Parse Server"
}
```

| Field  | Type   | Description |
| ------ | ------ | ----------- |
| result | string | Result data |

## Headers request

| Header       | Description                    | Value            |
| ------------ | ------------------------------ | ---------------- |
| Content-Type | Data response type you receive | application/json |
