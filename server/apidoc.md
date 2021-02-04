## RESTful endpoints
&nbsp;

### POST /auth/login

> Login

_Request Body_
```
{
    email: email,
    password: password
}
```
_Response (200 - OK)_
```
{
    message: 'Success',
    token: <Your token>
}
```
_Response (401 - Unauthorize)_
```
{
    message: 'Invalid email or password,
    response: false
}
```
### POST /auth/registration

> Login

_Request Body_
```
{
    email: email,
    password: password
}
```
_Response (200 - OK)_
```
{
    "message": "Success create",
    "data": {
        "id": 9,
        "email": "dithyprabowo51@gmail.com",
        "password": "$2a$10$vaKWoX7FYlJdLOpDLkSZWOoyK5aEMxhtETM7VugmHPguZHLDQ035G",
        "updatedAt": "2021-02-04T17:05:26.170Z",
        "createdAt": "2021-02-04T17:05:26.170Z"
    },
    "response": true
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Email must be unique",
    "response": false
}
```

### GET /card

> Get all cards

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 3,
        "url": "img4",
        "createdAt": "2021-02-04T18:33:20.815Z",
        "updatedAt": "2021-02-04T18:33:20.815Z",
        "UserCard": {
            "userId": 9,
            "cardId": 3,
            "createdAt": "2021-02-04T18:33:20.832Z",
            "updatedAt": "2021-02-04T18:33:20.832Z"
        }
    }
]
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found",
    "response": false
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Invalid token",
    "response": false
}
```
---

### POST /card

> Add Card

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    imgUrl: string
}
```
_Response (200 - OK)_
```
"Success created"
```

### DELETE /card

> Add Card

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - OK)_
```
"<Img url random>"
```