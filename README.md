# Business Logic Service Layer

## Description

This layer is responsible of handling the logic behind the api calls. For example, calling the api
/api/tv-program/today it will return all the tv programs of today, and not only the ones specific
of a channel.

## Responsibilities

- Handle the logic behind the api calls.

## API

The data returned by this layer is a JSON object with the following structure:

```json
{
    "data": {
        // The data requested
    }
}
```

In case of error:

```json
{
    "error": {
        "message": "Error message",
        "code": "ErrorCode"
    }
}
```
